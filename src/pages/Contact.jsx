import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import TicketsHeader from "../features/contact/TicketsHeader";
import PersonalInformation from "../features/profile/PersonalInformation";
import ProfileTickets from "../features/contact/ProfileTickets";


export default function Contact() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <MainLayout activeTab="Contact">
      <div className="flex-1 flex flex-col gap-3.5 min-h-0 overflow-y-auto lg:overflow-hidden pr-0.5 custom-scrollbar">
        
        <TicketsHeader
          onNewTicketClick={() => setShowCreateForm(true)}
        />

        
        {showCreateForm ? (
          <PersonalInformation
            onCancel={() => setShowCreateForm(false)}
            onSubmit={(formData) => {
              console.log("Submitted Ticket:", formData);
              setShowCreateForm(false);
            }}
          />
        ) : (
          <ProfileTickets/>
        )}
      </div>
    </MainLayout>
  );
}