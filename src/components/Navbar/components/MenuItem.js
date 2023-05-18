import React from "react";
import RenderMenuItem from "./RenderMenuItem";
import RenderDropdownMenuItem from "./RenderDropDownMenuItem";

/**
 * A component that renders the drawer sidebar navigation with buttons that link to the pages in the drawerList array.
 * This drawer also contains buttons to switch the language, switch dark/light mode, and close the drawer.
 * @param {open: boolean, drawerList: obj[], handleDrawerClose: func} param properties of the drawer component
 */
export default function MenuItems({ drawerList }) {
  return drawerList.map((value, index) =>
    value?.values ? (
      <RenderDropdownMenuItem value={value} index={index} outer />
    ) : (
      value?.label && <RenderMenuItem value={value} index={index} outer />
    )
  );
}
