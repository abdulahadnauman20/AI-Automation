import { CircleX, Mail, MoveDown } from "lucide-react";
import { useCampaignQuery } from "../reactQuery/hooks/useCampaignQuery";

function SideDrawer2({ isOpen, setIsOpen }) {
  const { getAllCampaignsQuery } = useCampaignQuery();

  const {
    data: campaigns,
    isLoading,
    error,
  } = getAllCampaignsQuery();

  console.log(campaigns, "campaigns");

  return (
    <div className="relative">
      <div
        className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-gray-50 w-80 shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-base font-semibold text-gray-500 dark:text-gray-400 flex items-center">
            AI sequence template
          </h5>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
          >
            <CircleX size={22} />
          </button>
        </div>

        {/* Loading/Error Handling */}
        {isLoading && <p>Loading campaigns...</p>}
        {error && <p className="text-red-500">Failed to load campaigns</p>}

        {/* Render fetched campaigns */}
        {Array.isArray(campaigns) &&
          campaigns.map((campaign) => {
            const emails = campaign.sequence?.Emails || [];

            const emailSteps = emails.map((email, index, arr) => {
              const isFollowUp = email.Subject === "" && index > 0;
              return {
                id: index + 1,
                value: isFollowUp
                  ? `Follow-up to "${arr[index - 1]?.Name || "Previous Email"}"`
                  : email.Name,
                subject: email.Subject,
                body: email.Body,
                delay: email.Delay,
              };
            });

            return (
              <div key={campaign.id} className="border hover:border-teal-300 bg-white p-2 rounded-xl mb-3">
                <div className="flex items-center gap-1">
                  <Mail size={17} />
                  <p className="py-0 font-medium">{campaign.name}</p>
                </div>
                <p className="text-gray-400 text-[15px]">{campaign.description || "No description provided."}</p>
                <hr className="text-gray-200 py-1" />
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-1">
                    <MoveDown size={16} className="text-gray-400" />
                    <p>{campaign.score || "N/A"}</p>
                  </div>
                  <button className="px-3 py-1.5 cursor-pointer hover:text-white hover:bg-teal-600 rounded-full border border-gray-500">
                    Use template
                  </button>
                </div>

                {/* Display Email Steps */}
                <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                  {emailSteps.map((step) => (
                    <li key={step.id}>
                      {step.value} ({step.delay}h)
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SideDrawer2;
