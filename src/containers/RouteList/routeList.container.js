import React, { Component } from "react";
import data from "@solid/query-ldflex";
import { namedNode } from "@rdfjs/data-model";
import { RouteListPageContent } from "./routeList.component";
import { successToaster, errorToaster } from "@utils";

/**
 * Container component for the Welcome Page, containing example of how to fetch data from a POD
 */
export class RouteListComponent extends Component<Props> {
  render() {
    const { webId } = this.props;
    return <RouteListPageContent {...{ webId }} />;
  }
}
