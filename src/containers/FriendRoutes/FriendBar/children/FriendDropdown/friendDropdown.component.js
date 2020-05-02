import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useTranslation } from "react-i18next";
import { deleteFriend } from "../../../../../services/friendsManager";

const FriendDropdown = (props) => {
  const { friendWebId } = props;
  const { t } = useTranslation();

  return (
    <DropdownButton
      variant="light"
      id="dropdown-basic-button"
      title=""
      data-testid="friend-dropdown"
    >
      <Dropdown.Item target="_blank" href={friendWebId}>
        {t("friendsManagement.profile")}
      </Dropdown.Item>
      <Dropdown.Item onClick={(event) => deleteFriend(event)}>
        {t("friendsManagement.delete")}
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default FriendDropdown;
