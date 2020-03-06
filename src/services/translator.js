import Route from "../domain/domainClasses.js";
import MapNode from "../domain/domainClasses.js";
import Resource from "../domain/domainClasses.js";
import Comment from "../domain/domainClasses.js";

/**
 * This service acts as an intermidiate step which connects the UI and the underlying POD server. It performs JSON-LD to Domain Model Objects translation and viceversa.
 */
export default class FormatTranslatorService {
  // TODO: Discuss if async makes sense here
  /**
   * Loads route information from the POD and transforms it into Domain Model Objects usable on the user interface.
   * @param {String} jsonURI URI where the route is stored on the POD
   * @returns {Route}
   */
  loadMapInfo = async jsonURI => {
    // Load JSON-LD from map

    var routeJson = /*Call underneath layer to retrieve JSON using the jsonUrl/name*/ 0;

    // Parse JSON-LD into MapNodes, Resources and Comments

    var mapNodeList = [];
    var resourceList = [];
    var commentList = [];

    return new Route(mapNodeList, resourceList, commentList);
  };

  // TODO: Comment if async method makes sense
  
  /**
   * Translates Domain Model Objects into JSON-LD and stores it on the POD.
   * @param {Route} route Route Domain Model Object representing a route
   */
  sendMapInfo = async route => {
    // Take MapTriplet info and create JSON-LD
    // Send JSON-LD to underneath layer calling the needed method
  };
}
