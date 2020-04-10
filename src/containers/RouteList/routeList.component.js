import React from "react";
import { Uploader } from "@inrupt/solid-react-components";
import { useTranslation } from "react-i18next";
import {
  RouteListWrapper,
  RouteListCard,
  WelcomeLogo,
  WelcomeProfile,
  WelcomeName,
  ImageWrapper
} from "./routeList.style";
import { ImageProfile } from "@components";
import { errorToaster } from "@utils";
import { InfiniteList } from "@components";

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const RouteListPageContent = props => {
  const {
    webId,
    image,
    updatePhoto,
    handleInfiniteLoad,
    elementInfiniteLoad,
    elements,
    isInfiniteLoading,
    name
  } = props;
  const { t } = useTranslation();
  const limit = 2100000;
  return (
    <RouteListWrapper data-testid="welcome-wrapper">
      <RouteListCard className="card">
        <WelcomeLogo data-testid="welcome-logo">
          <img src="/img/LogoViadeEn2a.svg" alt="Viade En2A" />
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
      </RouteListCard>
      <RouteListCard className="card">
        <InfiniteList
          {...{
            elements: elements,
            isInfiniteLoading: isInfiniteLoading,
            handleInfiniteLoad: handleInfiniteLoad,
            elementInfiniteLoad: elementInfiniteLoad
          }}
        />
      </RouteListCard>
    </RouteListWrapper>
  );
};
