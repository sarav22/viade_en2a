import React, { useEffect } from "react";
import data from "@solid/query-ldflex";
import { namedNode } from "@rdfjs/data-model";
import {
  Uploader,
  AccessControlList,
  useNotification
} from "@inrupt/solid-react-components";
import { Trans, useTranslation } from "react-i18next";
import {
  WelcomeWrapper,
  WelcomeCard,
  WelcomeLogo,
  WelcomeProfile,
  WelcomeDetail,
  WelcomeName,
  ImageWrapper
} from "./welcome.style";
import { ImageProfile } from "@components";
import {
  errorToaster,
  storageHelper,
  ldflexHelper,
  permissionHelper,
  notification as helperNotification
} from "@utils";
import { shareWrite, shareRead } from "../../services/sharing";

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const WelcomePageContent = props => {
  const { webId, image, updatePhoto, name } = props;
  const { t } = useTranslation();
  const limit = 2100000;

  const { createInbox } = useNotification(webId);

  async function initializeOrRepairFiles(path) {
    // Set inbox path relative to the existing app's path in the pod
    const settingsFilePath = `${path}settings.ttl`;
    let inboxPath = `${path}inbox/`;
    let hasInboxLink = false;
    const agent ="http://localhost:3000/";
    shareWrite(webId,settingsFilePath ,agent);
    // Check if the settings file contains a link to the inbox. If so, save it as inboxPath
    const inboxLinkedPath = await ldflexHelper.getLinkedInbox(settingsFilePath);
    if (inboxLinkedPath) {
      inboxPath = inboxLinkedPath;
      hasInboxLink = true;
    }

    // First, check if we have WRITE permission for the app
    const hasWritePermission = await permissionHelper.checkSpecificAppPermission(
      webId,
      AccessControlList.MODES.WRITE
    );
    // If so, try to create the inbox. No point in trying to create it if we don't have permissions
    if (hasWritePermission) {
      await createInbox(inboxPath, path);
      
      shareWrite(webId, inboxPath ,agent);

      // Check for CONTROL permissions to see if we can set permissions or not
      const hasControlPermissions = await permissionHelper.checkSpecificAppPermission(
        webId,
        AccessControlList.MODES.CONTROL
      );

      // If the user has Write and Control permissions, check the inbox settings
      if (hasControlPermissions) {
        // Check if the inbox permissions are set to APPEND for public, and if not fix the issue
        await permissionHelper.checkOrSetInboxAppendPermissions(
          inboxPath,
          webId
        );
      }

      if (!hasInboxLink) {
        await data[settingsFilePath].inbox.set(namedNode(inboxPath));
      }
    }
  }

  const init = async document => {
    try {
      const path = await storageHelper.getAppStorage(webId);

      // Fetch the game's path in the pod, based on user's storage settings
      await storageHelper.createInitialFiles(webId);
      
      let appPath = "";
      appPath = await storageHelper.getAppStorage(webId);
      const viadeSettings = `${appPath}settings.ttl`;
      const agent ="http://localhost:3000/";
      const inboxes = await helperNotification.findUserInboxes([
        { path: webId, name: "Global" },
        { path: viadeSettings, name: "Viade" }
      ]);
      const to = helperNotification.getDefaultInbox(inboxes, "Viade", "Global");
      shareWrite(webId, to.path ,agent);
      shareRead(webId,viadeSettings ,agent);
      if (path) {
        await initializeOrRepairFiles(path);
      }
    } catch (e) {
      /**
       * Check if something fails when we try to create a inbox
       * and show user a possible solution
       */
      if (e.name === "Inbox Error") {
        return errorToaster(e.message, "Error", {
          label: t("errorCreateInbox.link.label"),
          href: t("errorCreateInbox.link.href")
        });
      }

      errorToaster(e.message, "Error");
    }
  };

  useEffect(() => {
    if (webId) init(webId);
  }, [webId]);

  return (
    <WelcomeWrapper data-testid="welcome-wrapper">
      <WelcomeCard className="card">
        <WelcomeLogo data-testid="welcome-logo">
          <img src="img/logo.svg" alt="Inrupt" />
        </WelcomeLogo>
        <WelcomeProfile data-testid="welcome-profile">
          <h3>
            {t("welcome.welcome")}, <WelcomeName>{name}</WelcomeName>
          </h3>
          <ImageWrapper>
            <Uploader
              {...{
                fileBase: webId && webId.split("/card")[0],
                limitFiles: 1,
                limitSize: limit,
                accept: "jpg,jpeg,png",
                errorsText: {
                  sizeLimit: t("welcome.errors.sizeLimit", {
                    limit: `${limit / 1000000}Mbs`
                  }),
                  unsupported: t("welcome.errors.unsupported"),
                  maximumFiles: t("welcome.errors.maximumFiles")
                },
                onError: error => {
                  if (error && error.statusText) {
                    errorToaster(error.statusText, t("welcome.errorTitle"));
                  }
                },
                onComplete: uploadedFiles => {
                  updatePhoto(
                    uploadedFiles[uploadedFiles.length - 1].uri,
                    t("welcome.uploadSuccess"),
                    t("welcome.successTitle")
                  );
                },
                render: props => (
                  <ImageProfile
                    {...{
                      ...props,
                      webId,
                      photo: image,
                      text: t("welcome.upload"),
                      uploadingText: t("welcome.uploadingText")
                    }}
                  />
                )
              }}
            />
          </ImageWrapper>
        </WelcomeProfile>
      </WelcomeCard>
      <WelcomeCard className="card">
        <WelcomeDetail data-testid="welcome-detail">
          <Trans i18nKey="welcome.title">
            <h3>
              title
              <a
                href="https://github.com/inrupt/solid-react-sdk"
                target="_blank"
                rel="noopener noreferrer"
              >
                link
              </a>
            </h3>
          </Trans>
          <Trans i18nKey="welcome.description">
            <p>
              text
              <a
                href="https://solid.inrupt.com/docs/intro-to-linked-data"
                target="_blank"
                rel="noopener noreferrer"
              >
                link
              </a>
              <a
                href="https://solid.inrupt.com/how-it-works"
                target="_blank"
                rel="noopener noreferrer"
              >
                link
              </a>
              text
            </p>
          </Trans>
          <h3>{t("welcome.githubTiitle")}</h3>
          <Trans i18nKey="welcome.githubText">
            <p>
              text
              <a
                href="https://github.com/Arquisoft/viadeSpec"
                target="_blank"
                rel="noopener noreferrer"
              >
                link
              </a>
              <a
                href="https://github.com/Arquisoft/viade_en2a"
                target="_blank"
                rel="noopener noreferrer"
              >
                link
              </a>
              .
            </p>
          </Trans>
        </WelcomeDetail>
      </WelcomeCard>
    </WelcomeWrapper>
  );
};
