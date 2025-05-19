"use client";

import AddTabPopup from "@/app/admin/configuration/profile/[...slug]/components/tabs/add-new-tab-popup";
function NoTabFound() {
  return (
    <div id="user-details" className="empty-tab-list">
      <h1 className="user-details--no-tabs__title">No Tabs Present</h1>
      <AddTabPopup length={0} />
    </div>
  );
}

export default NoTabFound;
