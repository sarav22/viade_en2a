import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import { parseGpxToRoutes } from "../../../services/importing/gpx/gpxParser.js";
import { saveRouteToPOD } from "../../../services/DomainJSONTranslator.js";
import { errorToaster } from "@utils";
import { successToaster } from "@utils";
import { ImportDropzoneStatus } from "./lateralMenu.style";
import { ImportDropzoneWrapper } from "./lateralMenu.style";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LateralMenu = (props) => {
  const { t } = useTranslation();
  const [file, updateFile] = useState(null);
  const [acceptedFiles, updateAcceptFiles] = useState(null);

  const submitButtonHandle = (event) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => errorToaster(t("error.fileReadError"), "Error");
      reader.onerror = () => errorToaster(t("error.fileReadError"), "Error");
      reader.onload = () => {
        const routeString = reader.result;
        try {
          var importResult = true;
          parseGpxToRoutes(routeString, function(routeArray) {
            routeArray.forEach((route) => {
              saveRouteToPOD(route, function(result) {
                importResult = importResult && result;
              });
            });
            if (importResult && routeArray.length > 0) {
              successToaster(t("import.success"), t("import.successTitle"));
              updateAcceptFiles(null);
              updateFile(null);
            } else {
              errorToaster(t("import.failure"), t("import.failureTitle"));
            }
            if (routeArray.length > 0) {
              props.setRoute(routeArray);
            } else {
              errorToaster(
                t("error.gpxNotRoutes"),
                t("error.gpxNotRoutesTitle")
              );
            }
          });
        } catch (error) {
          errorToaster(t("error.importError"), "Error");
        }
      };
      reader.readAsText(file);

      event.preventDefault();
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length !== 1) {
      errorToaster(t("error.sizeLimitImport"), "Error");
    } else {
      updateFile(
        acceptedFiles.map((file) => <li key={file.path}>{file.path}</li>)
      );
      updateAcceptFiles(acceptedFiles);

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => errorToaster(t("error.fileReadError"), "Error");
        reader.onerror = () => errorToaster(t("error.fileReadError"), "Error");
        reader.onload = () => {
          const routeString = reader.result;
          try {
            parseGpxToRoutes(routeString, function(routeArray) {
              if (routeArray.length > 0) {
                props.setRoute(routeArray);
              } else {
                errorToaster(
                  t("error.gpxNotRoutes"),
                  t("error.gpxNotRoutesTitle")
                );
              }
            });
          } catch (error) {
            errorToaster(t("error.importVisualizeError"), "Error");
          }
        };
        reader.readAsText(file);
      });
    }
  }, []);
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "50px",
    borderWidth: 3,
    borderRadius: 2,
    borderColor: "#d6d6d6",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const activeStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: ".gpx",
    maxFiles: 1,
    onDrop,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  );
  return (
    <Form onSubmit={submitButtonHandle}>
      <ImportDropzoneWrapper>
        <div data-testid="dropMenu" {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>{t("import.dragAndDropMain")}</p>
          <p>{t("import.dragAndDropSupported")}</p>
        </div>
      </ImportDropzoneWrapper>
      <ImportDropzoneStatus>
        <p>{t("import.dragAndDropCurrentFiles")}</p>
        <ul>{file}</ul>
        <Button
          variant="primary"
          type="submit"
          disabled={acceptedFiles === null}
        >
          {t("import.submitButton")}
        </Button>
      </ImportDropzoneStatus>
    </Form>
  );
};
export default LateralMenu;
