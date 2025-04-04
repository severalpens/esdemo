import {  useState } from 'react';

// interface Document {
//   _id: string;
//   _ignored: Array<string>;
//   _index: string;
//   _score: number;
//   _source: {
//     answer: string;
//     channel: string;
//     created_date: string;
//     result_type: string;
//     suggest: string;
//     summary: string;
//     title: string;
//     url: string;
//   }
// }

interface Source {
      answer: string;
      channel: string;
      created_date: string;
      result_type: string;
      suggest: string;
      summary: string;
      title: string;
      url: string;
  }

const main_json = [
  {
      "title": "How can I download statement or transaction information to use with my financial accounting software?",
      "summary": "",
      "result_type": "FAQ",
      "channel": "Website",
      "answer": "If you use Internet Banking you can view, print and download your transaction information.To download or export transactions from Internet Banking:Log on toInternet BankingSelect Transaction History from the left-hand menuSelect the account you wish to search, enter the period you wish to search, then click searchOnce your results are presented, click the 'Download Transactions' link.You can save your results in CSV, OFX, QIF and ASCII formats to match your accounting software preferences.",
      "url": "https://www.suncorpbank.com.au/help-support/faqs/business-banking.html",
      "created_date": "2025-02-20",
      "suggest": "How can I download statement or transaction information to use with my financial accounting software?"
  },
  {
      "title": "Business Payments Credit",
      "summary": "",
      "result_type": "FAQ",
      "channel": "Website",
      "answer": "Tired of making manual bank-transfers each week to your employees, creditors, and suppliers? With Suncorp Bank\u2019s Business Payments Credit Solution, you can\u00a0automate the process; make easy, bulk, and scheduled payments right from your Internet Banking, saving you time, stress, and a load of effort.What you need to use Business Payments CreditAn Eligible Business accountThe following accounts are eligible for Business Payments Credit:Everyday Business AccountBusiness Premium AccountBusinessBusiness Investment AccountBusiness Management AccountRevolving Credit Account/Finance Pak facilityBusiness Line of CreditReal Estate Trust AccountSolicitors Trust AccountTo perform Business Payments Credit, you'll need to have the appropriate relationships setup for you to setup and/or approve Business Payments. These can be customised for each business so call us on13 11 75if you need further information.Security TokenTo use Business Payments Credit, you'll need to input a Security Token Code. A Security Token will be required for each person that will be setting up and approving business payments (if required).Business users can apply for a Security Token via Internet Banking.An APCA Credit IDTo perform Business Payments, you'll need an Australian Payments Clearing Association (APCA) ID.If you are making business payments credits from different businesses such as ABC Pty Ltd and XYZ Pty Ltd, you will need to apply for an APCA ID for each business.To apply for an APCA Credit ID, call us on13 11 75or visit your local branch.Creating a Business PaymentYou can set up a Business Payments Credit in one of three ways:Manually create a Business Payments templateUse an existing templateUpload an ABA file (Australian Bankers Association) which is typically created by accounting software such as MYOB or QuickenOnce you have set up a Business Payments Credit you can save it as a template and use it again for\u00a0new Business Payments at a later time.Below you will see the options at the top of the page. You can also see any Business Payments that are awaiting approval and any future dated Business Payments.Manually Creating a Business PaymentSelect\u00a0Business Payments Credit\u00a0from the left hand menu then click\u00a0Manual Entry.You can either load a saved template of create a new one. To create a new one, first\u00a0select the APCA ID\u00a0you wish to use for this payment.If you are managing multiple businesses and are using multiple APCA credit IDs, please select the relevant ID from the dropdown options. If your APCA ID is missing from the list, contact us on13 11 75or617 3362 2222and we can add it to your list.Proceed down to the\u00a0Add Payment\u00a0button.Once you click\u00a0Add Payment, a pop-up box will appear that will let you enter details for your Business Payments transactions. You can move this pop-up window to suit you. Each time you enter details and hit\u00a0Submit, it will then be added to the table.To fill out the payment details in the Add Payment pop-up:Enter the account name. Account name is for reference purposes only. Funds will be transferred to the provided account number regardless of whether the account name matches the account number. You must ensure that the account number is correct.Enter the BSB code of the account you want the funds transferred to. Ensure this number is correct.Enter the account number of the account you want the funds transferred to. Ensure this number is correctEnter a Reference name so that the recipient will recognise where the payment came from.Enter the amount to be transferred.Once you have entered transactions, they will appear in the table. You can\u00a0sort the transactions in the table\u00a0by clicking on the top row of each column. An arrow will indicate the direction in which the\u00a0columns are being sorted.To move between pages in the table, use the page selector on the bottom of the table. The total value of the Business Payment will be shown on the bottom right of the table.Once you have finished entering your transactionsIf you only wish to save your entered transactions as a template and not submit them select\u00a0Save Only. This will take you to the screen where you can save the template.You can nominate an account for which this template will be associated to.Enter a name for the template and click\u00a0Save.Submitting a Business PaymentFrom the manual entry screen\u00a0click Next.Confirm the details of the Business Payment.Choose the account you wish to use for the business paymentEnter a reference for the Business Payment. This will appear on your statement and transaction history.Select the timing of the Business Payment. You can either submit it immediately or future date the business payment (up to 120 days from the day you are creating the Business Payment.)If you wish to save the transactions you have entered as a template for future use, Click yes and give the template a name. This will then become available in the Business Payments templates section.Click NextUse an existing TemplateSelect Business Payments Credit from the left hand menu then click\u00a0Saved Template.Select the account that's associated with the template you previously saved.A list of saved templates will appear. Select the template you want to use.Load Saved Template page:You will then see the existing transaction information for the template that you selected.You can choose to edit any of the transactions at this stage.Click Next and proceed as per payment of a manual Business PaymentUpload an ABA/BECS fileIn the Business Payments Credit page, select\u00a0Upload Payment File.Click browse and search for the ABA file on your computer.Click Next.You will now see the Business Payment options screen. The APCA id to be used and total Business Payment amount will be displayed.Business Payment Upload File and Confirm Details:Choose the account you want to process this Business Payment from.Enter a reference for the payment.Select the timing of the business payment which can be immediate or in the future (up to 120 days from the time you set it up). You may have already specified a date in the software you used to create the ABA file. We will use this date if available.Click Next to confirm all of the details. The transactions to be processed in the Business Payment will be displayed.Enter your Security Token Code to verify the payment and click confirm.Your payment will now either be submitted for processing or sent to\u00a0Payments Awaiting Approval. Another signatory will need to approve the payment if it goes into this status. An email and secure message will be sent.Account and Personal LimitsThe account owner can apply Account and Personal Limits to an individual business account. This gives the account owner flexibility and control over the value of payment files that can be processed from a particular account and the value of payment files that can be processed by a particular individual with a relationship to an account.If an account or personal limit has been set, it will always override the daily limit.If there are no account limits applied to an account then any individual transacting on the account will be restricted by their Internet Banking\u00a0Daily limit.Account and personal limits do not count toward your daily limit. Account and personal limits override a daily limit. Eg. An account limit of $50,000.00 will override your daily limit of $20,000.00.Account LimitsAccount Limits are limits applied to an individual account that limit the total dollar value of Business Payment Credit files, external transfers and funds transferred to another Suncorp Bank account that can be processed from the account on a daily basis.For example, if you place a $20,000.00 account limit of a business account, only $20,000.00 can be transferred via business payments, external transfers and transfers to other Suncorp Bank accounts regardless of the account balance or daily limit set.Personal LimitsIf you choose to apply an Account Limit to your account, you can also have a Personal Limit for each individual relationship holder on an account. This limits the total dollar value of Business Payments Credit files, external transfers and funds transferred to another Suncorp Bank account that the relationship holder can personally authorise from the account on a daily basis.For example, if you place a personal limit on Simon who works in your office for $5,000.00, Simon can only transfer up to $5,000.00 via business payments, external transfers and transfers to other Suncorp Bank accounts regardless of the account balance or daily limit set.Applying for a Account and Personal LimitYou can apply for an Account and/or Personal limits for relationship holders by contacting us on13 11 75or by visiting a Suncorp Bank branch.Account and Personal limits can only be applied for by the account owner(s) and are subject to approval by Suncorp Bank. For two to sign accounts the request for an account or personal limit must be given by at least two account owner(s).If you have an existing Account or Personal limit this can be increased or decreased by the account owner(s) and is subject to approval by Suncorp Bank. For two to sign accounts the request must be given by at least two account owner(s)Limit applications will take approximately 2 business days to be processed.Template ManagementBelow is how you can create, edit and delete templates for Business Payments Credit. A maximum of 25 templates is permissible per Business Account and each template can have a maximum of 1000 transactions.Creating a New TemplateTo create a new template, Click on Manual Entry and enter your transaction details.To save as a new template click Save Only.Choose the account you want to associate the template to.Name the template.Click Save.Editing an Existing TemplateTo access a previously saved template, simple click on Saved Template from the Business Payments page.Choose the account that was associated with the Business Payment and the available template will be displayed.Click Select to choose your desired template.Edit or process the Business Payment as desired.Deleting a TemplateTo access a previously saved template, simple click on Saved Template from the Business Payments page.Choose the account that was associated with the Business Payment and the available template will be displayed.Click Delete to remove the template from the listTransaction HistoryHere you can search and view the details and transaction history of previous files that have been processed, have failed or have been deleted. This functionality is available for both Business Payments Credit and Business Payments Debit.Note: You can also search for payments through looking at the bank statement for your Business Account from which the payment was processed. Simply click on the view details link that is located under the relevant transaction on your bank statement.How to search for a Business PaymentOn the main Business Payments page, click on\u00a0Search Business Payments HistoryFill in the details for which you want to searchClick search and your results will be displayedTo view the details of a Business Payment, click\u00a0selectPayments Awaiting ApprovalHere you can see all the Business Payments Credit files that have been set up but are awaiting approval. This is used in all cases where accounts have 2 to sign authority. Awaiting Approval allows you (an authorised approver) to either approve or delete the payment file depending on your situation.Note: Business Payments Credit files that are awaiting approval will be automatically deleted after\u00a014 days\u00a0from the date of set up unless approved, deleted or cancelled by an authorised signatory.Approving a Business Payments Credit file awaiting approvalIf a Business Payment has been setup and requires further approval, it will go into an Awaiting Approval status.When you logon to Internet Banking, you will see the below symbol to alert you of payments you need to approve.Click on Business Payments Credit.In the Payments Awaiting Approval section, payments requiring approval will be listed.Select the payment to approve.Example of Payments Awaiting Approval:Confirm the details of the business payment.Enter your Security Token CodeClick Approve to submit the payment.Deleting a Business Payments Credit awaiting approvalTo delete a Business Payment, simply find the Business Payment in the awaiting approval list and select delete.Future Dated PaymentsHere you can search and view the details and transaction information of files that have been set to be processed at a future date. As long as you are authorised you can use this function to delete any future dated payments that are no longer required. This functionality is available for both Business Payments Credit and Business Payments Debit.File Error Explanations",
      "url": "https://www.suncorpbank.com.au/help-support/faqs/business-banking.html",
      "created_date": "2025-02-20",
      "suggest": "Business Payments Credit"
  },
  {
      "title": "Updating Your Details, Daily Limits and Password",
      "summary": "",
      "result_type": "FAQ",
      "channel": "Website",
      "answer": "You can update and change a range of items via \"Settings and Security\" from the Internet Banking menu.Change PasswordGo to Settings and SecurityClick \"Change my password\".Type in your Current Internet Banking Password, then type in your New Internet Banking Password. Then type it in again in Confirm New Internet Banking Password.Click \"Save\" to save your new Internet Banking password.Update my addressGo to Settings and Security and click the \"Update Contact Details\" tabHere, you can change your address details including phone numbers. The changes will be processed within 2-3 business days. We will respond to your instruction via Secure Messages and advise if you need to supply any supporting documentation to complete your request.If you would like to change the formal name on your account, please visit your nearest Suncorp Bank branch with sufficient identification of your new and old name e.g. a marriage certificate.Change Email AddressHere, you can change your primary and secondary email addresses. These can also be updated directly at the bottom My Accounts page. Ensure you keep your email address(es) up to date so we can send you automated alerts regarding transfers or payments.Your email addresses are located under your accountsSimply click \"change\" and enter the new email addressClick the tick to save the new email address or cross to return to your original email address.Daily LimitsGeneral Information about Daily LimitsDaily limits are a security measure to limit the amount of money that could be fraudulently transferred from any of your accounts to a 3rd party using Internet Banking.A daily limit applies to transactions initiated from your Internet banking Customer ID. There is one combined limit for all of your accounts.Your daily limit remaining and current daily limit are both shown next to the Amount field on the Other Suncorp Bank Account transfers screen, BPAY screen and the External Transfers screen.All transactions to non-Suncorp Bank accounts, to other Suncorp Bank accounts, BPAY transactions and Business Payments are subject to the daily limit. The total of these three types of transactions on any given day must be less than your daily limit. Any transaction that exceeds your daily limit will be rejected.External Transfers and Business Payments require you to enter a Security Token Code to verify the transaction.If two people have access to the same account through Internet banking, then each user will have their own daily limit.Daily limits reset to zero at approximately midnight.Changing Your Daily LimitYou can request changes to your daily limit using the \"Change my daily limit\" link underneath your accounts section in Internet Banking. If you find that the limit is higher than you use, you can request your limit to be lowered.You can change your limit from $0 to $50,000 online via Internet Banking. To change your daily limit over $5,000, you'll need to purchase a Suncorp Bank Security Token.Limits for International Money TransfersThe maximum amount for Online Telegraphic Transfers using the \"Overseas Account\" type can not be changed by altering your daily limit. Subject to your daily limit, the transaction limits for Online Telegraphic Transfers are:Up to AUD $20,000 can be completed 24 hours a day; andTransactions over AUD $20,000 can only be completed during the hours 8.00 am and 6.00pm AEST on any Business Day (being Monday to Friday on which branches of Suncorp Bank are open for business in Brisbane)A single Online Telegraphic Transfer cannot exceed AUD $50,000.The maximum amount that can be transferred within a 48 hour period is AUD $100,000 per Customer ID.Limits for Business AccountsBusiness Account owners can apply for account limits and personal limits to be applied to business accounts. These are subject to approval by us.An\u00a0Account\u00a0Limit limits the total dollar value of all external transfers, BPAY\u00ae, Business Payment Credit files and transfers to another Suncorp Bank account that can be processed from the account each day.A\u00a0Personal\u00a0Limit can be set up for each individual that transacts on the account. It limits the total dollar value of all external transfers, BPAY\u00ae, Business Payment Credit files and transfers to another Suncorp Bank account that the individual can approve each day. Personal limits are only available if an Account Limit is in place.While an account limit or personal limit is in place for an account, the dollar value of external transfers, BPAY\u00ae, Business Payment Credit files and transfers to another Suncorp Bank account made from that account will not be included in the daily limit for the person registered for Internet Banking (e.g.an account limit will override a daily limit).Limits for Business Payments DebitLimits are in place if you're uploading an ABA file to Internet Banking in order to process a business payment debit.A\u00a0Period\u00a0limit restricts the total dollar value of Business Payment Debit files that can be processed for a particular Debit User during a certain period (eg daily, weekly, monthly).A\u00a0File\u00a0limit restricts the total dollar value of an individual Business payment Debit file that can be processed by a particular Debit user.A\u00a0Transaction\u00a0Limit is set for each Debit user and limits each individual transaction that is contained within the Business Payment Debit File.How Daily Limits Affect Future Dated and Recurring\u00a0TransfersFuture dated and recurring payments that are set up to occur on a future and/or recurring\u00a0date, to both Suncorp Bank and non-Suncorp Bank accounts, will affect the daily limit\u00a0on the date the transfer is processed\u00a0and not on the day of set up.For example if you have a future dated transfer that you setup today the first of February for April 15, your daily limit will be deducted overnight on April 15 when the transaction takes place.Business payments reduce the daily limit\u00a0on the date that they are set up\u00a0regardless of the future date of the transaction.The maximum amount for an immediate transfer is your remaining daily limit, and the maximum amount for a future dated transfer is the full amount of your daily limit.If there is an insufficient amount of your daily limit remaining on the date that the transaction actually occurs, the transaction will usually be rejected on that date, and you will receive a notification of the failure by secure message through internet banking.How Daily Limits Affect Two to Sign AccountsWhen a transaction which is subject to a daily limit is set-up under a two to sign authority, the limit will be deducted from the person\u00a0who sets up the transaction. The limit of the person approving the transaction won't be affected.ProfilesProfiles help you group your accounts for more effective Internet banking. For example, you could group your personal accounts in one profile, and have your business accounts in another profile.This way, you only see the accounts that are relevant to a particular group or purpose. If you do not need to group your accounts then the default profile can be used to view all of your accounts.Profiles may also have separate and different email addresses from the original default email addresses provided to further assist you to manage your Internet banking needs.When you first start using Internet banking, you are given a\u00a0default\u00a0profile.You can create up to 10 profiles with a maximum of 20 accounts linked to each profile. An account can be added to more than one profile.Creating a new profileSelect \"Manage My Profiles\" from the green banner on the top of the page.Under\u00a0Create New Profile, enter in a profile name, followed by your preferred primary and secondary email addresses.Click \"Save\" and you have created a new profile. Your new profile has no accounts yet, so you need to go to the next section to add accounts to your profile.If you want to make this your default profile so that the linked accounts appear each time you login, underMaintain Profiles\u00a0click \"Make Default\" in the\u00a0Make Default Profile\u00a0column.Changing the active profileClick the current\u00a0Active Profile\u00a0name at the top of the page.From the drop down list, select the profile you wish to change to.The accounts in use will now be those linked to the profile you have selected.Making a profile the default on loginYou can select which profile is shown automatically when you login into Internet Banking.Select \"My Details\" in the left hand menu then click \"Manage My Profiles\".Locate the profile in the\u00a0Maintain Profiles\u00a0list that you want shown each time you login, click \"Make Default\" under the\u00a0Make Default Profile\u00a0column.Deleting a profileSelect \"My Details\" in the left hand menu then click \"Manage My Profiles\".Locate the profile in the\u00a0Maintain Profiles\u00a0list you wish to delete and click \"Delete\". This will update your profile list and the deleted profile will no longer exist.Adding and removing accounts on your profileChange your active profile to the profile you wish to add accounts to.Refer to the Manage My Accounts section for details on how to add and remove accounts from the current profile.",
      "url": "https://www.suncorpbank.com.au/help-support/faqs/business-banking.html",
      "created_date": "2025-02-20",
      "suggest": "Updating Your Details, Daily Limits and Password"
  },
  {
      "title": "What do I need to complete online business payments?",
      "summary": "",
      "result_type": "FAQ",
      "channel": "Website",
      "answer": "To complete online business payments, you\u2019ll need:An eligible business accountA Security TokenAPCA Credit ID",
      "url": "https://www.suncorpbank.com.au/help-support/faqs/business-banking.html",
      "created_date": "2025-02-20",
      "suggest": "What do I need to complete online business payments?"
  },
  {
      "title": "What is an Australian Banking Association (ABA) file, and how do upload one?",
      "summary": "",
      "result_type": "FAQ",
      "channel": "Website",
      "answer": "An Australian Banking Association (ABA) file is a standard of file used by Australian Banks to make multiple payments for uploading data to Internet Banking systems.If you want to upload business payment transactions, you\u2019ll need an accounting package or software that can export in the ABA format.",
      "url": "https://www.suncorpbank.com.au/help-support/faqs/business-banking.html",
      "created_date": "2025-02-20",
      "suggest": "What is an Australian Banking Association (ABA) file, and how do upload one?"
  },
  {
      "title": "How do I use Business Payment credit in Internet Banking?",
      "summary": "",
      "result_type": "FAQ",
      "channel": "Website",
      "answer": "You can access business payment credits from the left-hand menu in Internet Banking. You use them in the following ways:Manual entrySaved templateFile uploadManagement my business payments templatePayments awaiting approvalFuture dated payments",
      "url": "https://www.suncorpbank.com.au/help-support/faqs/business-banking.html",
      "created_date": "2025-02-20",
      "suggest": "How do I use Business Payment credit in Internet Banking?"
  },
  {
      "title": "What is a Business Payments Credit?",
      "summary": "",
      "result_type": "FAQ",
      "channel": "Website",
      "answer": "With Suncorp Bank\u2019s Business Payments Credit solution, you can automate the process of manual bank transfers to employees, creditors and suppliers. Business Payments Credits enable you to easily schedule bulk payments from Internet Banking.",
      "url": "https://www.suncorpbank.com.au/help-support/faqs/business-banking.html",
      "created_date": "2025-02-20",
      "suggest": "What is a Business Payments Credit?"
  },
  {
      "title": "How do I access Business Payments Credits (ABA files) in Internet Banking?",
      "summary": "",
      "result_type": "FAQ",
      "channel": "Website",
      "answer": "You can access the Business Payments Credit solution from the left-hand menu in Internet Banking.You can process your file using the following methods:Manual entrySaved templateFile uploadRead more in theBusiness Payments Credit tech sheet.",
      "url": "https://www.suncorpbank.com.au/help-support/faqs/business-banking.html",
      "created_date": "2025-02-20",
      "suggest": "How do I access Business Payments Credits (ABA files) in Internet Banking?"
  },
  {
      "title": "How to create a new template?",
      "summary": "",
      "result_type": "FAQ",
      "channel": "Website",
      "answer": "You can either load a saved template or create a new one.\u00a0 To create a new template, follow these steps:Select the APCA ID you want to use for the payment. If you don\u2019t have an APCA ID,learn how to apply for one.To add a new payment, click \u201cAdd Payment\u201dTo edit any existing payments in the table, simply click in the field you want to change and click \u201cSave\u201d.To sort a table column, click on the column heading eg. Account Name.To save the template only, click \u201cSave Only\u201d.\u00a0 To proceed with payment, click \u201cNext\u201d.",
      "url": "https://www.suncorpbank.com.au/help-support/faqs/business-banking.html",
      "created_date": "2025-02-20",
      "suggest": "How to create a new template?"
  },
  {
      "title": "How do I retrieve templates previously used/created?",
      "summary": "",
      "result_type": "FAQ",
      "channel": "Website",
      "answer": "Within the Business Payments Credit menu, follow these steps to access your saved template:Select \u2018Saved Template\u2019 to use or edit a previously saved payment template.Choose the saved template from the drop-down menuClick \u2018Select\u2019 to open the required template.Edit template by deleting recipients or amending account details and amount before submitting the payment.",
      "url": "https://www.suncorpbank.com.au/help-support/faqs/business-banking.html",
      "created_date": "2025-02-20",
      "suggest": "How do I retrieve templates previously used/created?"
  }
]
  


export default  function SearchClientDemo() {
    const [longDocuments ] = useState<Source[]>(main_json);
    const [filteredDocuments, setFilteredDocuments] = useState<Source[]>(main_json);
    const [selectedDocument, setSelectedDocument] = useState<Source | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [resultText, setResultText] = useState<string>('No document selected');


    const handleSearch = () => {
        if (searchTerm === '') {
            setResultText('No search term entered');
            return;
        }

        if(filteredDocuments.length === 0) {
            setResultText(`Found ${filteredDocuments.length} results. -> Start semantic search using '${searchTerm}  and return the results here.`);
        }
        else {
            setResultText(`Found ${filteredDocuments.length} results but none selected. -> Start semantic search using '${searchTerm}' and return the results here.`);
        }
        
    };

    const filterSearch = (eTargetValue: string) => {
        setSearchTerm(eTargetValue);
        const filtered = longDocuments.filter(doc => doc.answer.includes(searchTerm));
        setFilteredDocuments(filtered);
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/3 border-r border-gray-300 p-4">
                <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => filterSearch(e.target.value)}
                        placeholder="Type eg 'payment'"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setFilteredDocuments(longDocuments);
                                setSelectedDocument(null);
                                setResultText('No document selected');
                            }}
                            className="ml-2 p-2 bg-red-500 text-white rounded"
                        >
                            X
                        </button>
                    <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded">
                        Search
                    </button>
                </div>
                <ul className="space-y-2">
                    {filteredDocuments.map((doc: Source, index: number) => (
                        <li
                            key={index}
                            onClick={() => setSelectedDocument(doc)}
                            className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                        >
                            {doc.title}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-2/3 p-4">
                {selectedDocument ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">{selectedDocument.title}</h2>
                        <p>{selectedDocument.answer}</p>
                    </div>
                ) : (
                    <p>{resultText}</p>
                )}
            </div>
        </div>
    );
}

