import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import TicketsHeader from "../features/contact/TicketsHeader";
import ProfileTickets from "../features/contact/ProfileTickets";
import PersonalInformation from "../features/contact/PersonalInformation";


export default function Contact() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <MainLayout activeTab="Contact">
      <div className="flex-1 flex flex-col gap-2.5 min-h-0 overflow-y-auto lg:overflow-hidden pr-0.5 custom-scrollbar">
        <div className="shrink-0">
          <TicketsHeader
            onNewTicketClick={() => setShowCreateForm(true)}
          />
        </div>

        {showCreateForm ? (
          <div className="flex-1 flex items-start justify-center px-1 pb-2">
            <PersonalInformation
              onCancel={() => setShowCreateForm(false)}
              onSubmit={(formData) => {
                console.log("Submitted Ticket:", formData);
                setShowCreateForm(false);
              }}
            />
          </div>
        ) : (
          <ProfileTickets/>
        )}
      </div>
    </MainLayout>
  );
}