import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNotification, useLiveUpdate } from '@inrupt/solid-react-components';
import { NotificationsWrapper } from './notifications.style';
import { Bell, NotificationsPanel } from '../index';
import { useOnClickOutside } from '@hooks';
import {foaf} from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';
import{storeJSONshared} from '../../../../services/PODExtractor'
import { id } from 'rdf-namespaces/dist/sioc';import {
  ldflexHelper,
  storageHelper
} from "@utils";

let oldTimestamp;

type Props = {
  webId: String,
  inbox: String
};

/**
 * Notification wrapper for the Bell Icon and the Notifications Panel
 */
const Notifications = ({ webId, inbox }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef();
  const toggleNotifications = () => setIsOpen(!isOpen);
  /**
   * Notification hook from solid-react-components
   */
  const {
    notification,
    markAsReadNotification: markAsRead,
    deleteNotification,
    fetchNotification,
    filterNotification
  } = useNotification(webId);

  const { timestamp } = useLiveUpdate();
  const { notifications, unread, notify } = notification;
  
  /**
   * pass date to string to compare time updates
   * @type {*|string}
   */
  const currentTimestamp = timestamp && timestamp.toString();
  useOnClickOutside(ref, () => setIsOpen(false));

  /**
   * Fetch notifications from inbox
   * @returns {Promise<void>}
   */
  const initNotifications = async () => {
    try {
      setIsLoading(true);
      await fetchNotification(inbox);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
        
    async function isFriend(webId, actor) {
      if(actor===undefined){
        return false
      }
      const profileDoc =  await fetchDocument(webId);
      const profile = profileDoc.getSubject(webId);
      const fs=profile.getAllRefs(foaf.knows);
      let found = false;
      fs.forEach(f => {if(f===actor)found=true});
      if(found ===true){
        return true;
      }else{
        return false;
      }
     } 


  /**
   * If webId and notify instance exist we will init notifications, similar to componentDidMount
   */
  useEffect(() => {
    if (webId && notify) {
      initNotifications();
    }
  }, [inbox, notify]);

 
  /**
   * Fetch new notifications when liveUpdate's timestamp changes, similar to componentWillUpdate
   */
  useEffect(() => {
    if (currentTimestamp && oldTimestamp !== currentTimestamp) {
      initNotifications();
      oldTimestamp = currentTimestamp;
    }
  }, [timestamp]);


  
  useEffect(() => {
    initNotifications();
    if( notifications[0]!==undefined){
    let namefile= notifications[0].actor.webId.substring(8, webId.length - 16)
    let path= webId.substring(0, webId.length - 16)
    let jsonfile = `${path}/viade/shared/${namefile}.jsonld`;
    const jsonldfriend = 
      {
        "@context": {
            "@version": 1.1,
            "routes": {
                "@container": "@list",
                "@id": "viade:routes"
            },
            "viade": "http://arquisoft.github.io/viadeSpec/"
        },
        "routes": [
            {
                "@id": "http://podejemplo2.inrupt.net/viade/routes/route1.jsonld"
            }
        ]
    
    } 
  
  
    if(ldflexHelper.resourceExists(jsonfile)){
      storeJSONshared(jsonldfriend, jsonfile, function(success){
        if(success){
            alert("Se ha guardado");
        }
        else{
            alert("Fail");
        }
      });
    }
      //meter la ruta en la file
      isFriend(webId, notifications[0].actor.webId).then(function(value) {
        if(value===true){
          console.log("SI AMIGO");
      }else{
          console.log("NO AMIGO");
      }}
      );
    }
  }, [unread]);


  return (
    <NotificationsWrapper ref={ref}>
      <Bell unread={unread || 0} onClick={toggleNotifications} active={isOpen} />
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="notifications"
        unmountOnExit
        mountOnEnter
      >
        <NotificationsPanel
          {...{
            notifications,
            markAsRead,
            deleteNotification,
            tabs: inbox,
            filterNotification,
            isLoading
          }}
        />
      </CSSTransition>
    </NotificationsWrapper>
  );
};

export default Notifications;
