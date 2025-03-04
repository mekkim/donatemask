import { MASK_PRICE } from "const";
import { formatCurrency } from "util";

// "$1.25"
const maskPriceFormatted = formatCurrency(MASK_PRICE);

export default [
  {
	  question: `Who are you? Are you a real charity?`,
	  answer: `The Donate A Mask Project is an initiative of Evidence-Based Social Enterprises Canada, a registered Charitable Organization.  You can look up the organization with the Canada Revenue Agency to verify that it is, indeed a real charitable organization, at this location: https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyRprtngPrd?q.srchNmFltr=evidence-based&q.stts=0007&selectedCharityBn=754329506RR0001&dsrdPg=1

The Donate A Mask Project Canada leverages the principles of the open source movement of transparency and auditability.  Our web page and activities are deliberately accessible to the general public via GitHub at this location: https://github.com/ebsecan`
  },

  {
    question: `How many masks can I request?`,
    answer: `Please request what you feel you and those you are requesting for can use over a 60 day period at most.  If you can, request one larger order for several people and distribute the masks yourself, rather than making several smaller requests as that costs us more in shipping. Also, recent research has shown that you can safely sanitize and reuse masks up to 25 times, so please clean and reuse them as much as you can so that there are more to go around. Do NOT wash them with soap and water, alcohol, or other cleaners. They will destroy the mask fibers, reducing efficiency. Instead, you can let the masks dry out or steam them. Details here: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7161499/ - If you need more masks later on, please feel free to submit another request.`,
  },

  {
    question: `I'm requesting for an organization/group/other larger number. Can you help us out?`,
    answer: `So far we have been able to support the organizations (including schools, churches, shelters, outreach groups, etc.) who have requested masks from us.  Assuming we are able to locate continuing funding for this charity program, we should be able to continue to meet the demands of organizations as well.  If your request is too large or there's some issue with it, we'll reach out to you via email to discuss.  If you don't hear from us, you can safely assume it's in the mail!`,
  },

  {
    question: `If you get more requests for masks than donations, how do you prioritize who gets masks?`,
    answer: `Initially, we were going to use a triage to prioritize mask requests based on funding and need.  However, we were able to get a loan on generous terms in order to purchase large quantities of masks directly from manufacturers at lower prices, so we have been fulfilling mask requests that don't have matching donations at present.  We'll continue to do this so long as our loan terms hold with the hope that we'll be able to get a charity grant soon in order to keep operating!`,
  },

  {
    question: `Why do you list "donations" in "masks" instead of dollars?  And why do you have the cost of "one mask" set at ${maskPriceFormatted} (CAD)?`,
    answer: `Great question!  We wanted to distinguish ourselves from other charitable initiatives by helping donors visualize exactly what they were doing.  By sizing donations in "number of masks", donors can visualize their friends, family and other members of society wearing those masks and directly understand the impact of their donation in terms of increased public health.  

The value of $2.50 "per mask" was the original value that was selected as a quasi-arbitrary number that incorporates factors such as mask cost, shipping costs, and organization costs, rounded upwards deliberately.  We, of course, pay nowhere near that amount per mask as we make volume purchases from suppliers.  More recently, in order for our stats page to reflect the reality of our funding situation more accurately, we lowered this amount to ${maskPriceFormatted} per mask, which roughly covers the cost of masks and shipping and overhead based on the volumes we have purchased.

Where there is extra money, more masks will be shipped with those funds; simple as that.  Everyone working on the Donate A Mask Project is an unpaid volunteer (whom we greatly appreciate!).  100% of donated funds go directly to the mission of putting masks in the mailboxes of requestors.  

If you're a media organization who wishes to report on this project, please reach out to us at marketing@donatemask.ca and we will be happy to show you all of our financial statements so that you can validate how the money is used in this charity project.`,
  },

  {
    question: `I am a large donor / donor organization who supports your mission and wants to make a large contribution of charitable funding; how do I do that?`,
    answer: `We're excited to collaborate with other like-minded organizations who understand the importance of putting high-quality masks directly in the hands of the most vulnerable in our society.  Reach out to us at donate@donatemask.ca and we can work out collaboration/donation details.  Thank you!`,
  },

  {
    question: `Will you issue a charitable donation receipt for my donation?`,
    answer: `Yes. We will issue charitable donations for all cash donations at the end of the calendar year for the aggregate amount of the total donations for that year as a single receipt. We will require the information that CRA mandates to appear on the receipts and we will reach out to you to collect this information: https://www.canada.ca/en/revenue-agency/services/charities-giving/charities/operating-a-registered-charity/issuing-receipts/what-information-must-on-official-donation-receipt-a-registered-charity.html
	
	We will not be issuing charitable donation receipts for purchase from the charity fundraising store.  For receipts for in-kind donations (masks, etc.), please discuss with us beforehand as these will be considered on a case-by-case basis, subject to CRA rules.`,
  },

  {
    question: `You provide a lot of ways to donate money.  Which is best for the Donate A Mask Project?`,
    answer: `Thanks for thinking about the flow of money.  As you no doubt know, payment processing can be expensive for charities.  We wanted to make a large range of donation payment options available to make donations as easy as possible, but, indeed, some cost more than others.

The simplest and most cost-effective way for us to receive donations is via INTERAC email transfers sent to donate@donatemask.ca.  Please set the password to "masks" for simplicity. Our bank (Desjardins) does not have email money transfer auto-deposit available for business accounts, so passwords are still required.  In this manner, we receive 100% of the funds, with no fees.  Some other means are also cost effective, so please feel free to use the means that are best for you.`,
  },

  {
    question: `I LOVE the Donate A Mask Project! I want to volunteer to help out!`,
    answer: `Thanks! We LOVE passionate people and we welcome your help. Please reach out to us at volunteer@donatemask.ca and we'll find a way to put your specific skills and interests to work towards our mission of making high-quality masks available to everyone with minimal fuss!`,
  },

  {
    question: `Is there a mobile app available?`,
    answer: `Not yet.  We're working on it and we'll let you know when it's live.  For now you can access the page using a mobile web browser.`,
  },

  {
    question: `How do I check the status of my mask request?`,
    answer: `Right now, we don't have an easy way for you to do that. In order to get up and running quickly, we chose an agile, incremental approach.  Order status is on our feature to-do list!  If you really need to know the status of your order urgently, please email us at request@donatemask.ca and one of our volunteers will look it up manually for you.`,
  },

  {
    question: `How long will shipping take?`,
    answer: `The shipping itself will mostly be done by UPS Stanard parcel in order to keep costs as low as possible as we have negotiated low corporate rates with UPS.  Requests to PO Boxes and to Northern Canada will be sent via Canada Post as UPS does not have regular service for those cases. We ship out requests and orders every week day via a daily UPS pickup in the evening.`,
  },

  {
    question: `We would like to sponsor your charity project in exchange for showcasing our brand or logo. Will you do that?`,
    answer: `Yes! Absolutely! We welcome corporate/other sponsorship.  We'll gladly showcase your logo/brand on the sponsor/thank you section of our site to recognize your contribution.  We may also be able to issue a charitable receipt to your organization for your donation (according to CRA accounting guidelines).  Please reach out to us at donate@donatemask.ca to coordinate your sponsorship!`,
  },

  {
    question: `I noticed something broken or that could be improved on your page. How do I report it?`,
    answer: `Thanks for noticing!  Please email us at tech@donatemask.ca with your problem report and we'll add it to our list of things to fix/improve!`,
  },

  {
    question: `Is this charity project politically motivated? `,
    answer: `Hard no. Under the charitable organizations regulations with the Canada Revenue Agency, we cannot be involved in political matters to maintain our charitable status. Nothing on here or in our social media should be interpreted as politically motivated. We focus on the evidence, the science, and what actually helps vulnerable people.`,
  },

  {
    question: `Where does your funding come from?`,
    answer: ` 100% of our funding comes from donations from people like you and organizations willing to help out, as well as from the small margins on our charity fundraising store sales. We do not receive any government grants or other such funding to run this charitable initiative--yet!  We are applying for government and other charitable grants to support this initiative and will update you if we're lucky enough to receive them!`,
  },

  {
    question: `What's the best way to protect myself from COVID-19?`,
    answer: `While we are not in a position to give you medical advice, here are some websites that describe the science of epidemiology and best practices to stay safe:

  https://www.canada.ca/en/public-health/services/diseases/coronavirus-disease-covid-19.html

  https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks.html

  https://www.cdc.gov/coronavirus/2019-ncov/faq.html

  https://www.fda.gov/emergency-preparedness-and-response/coronavirus-disease-2019-covid-19/covid-19-frequently-asked-questions

  https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)32153-X/fulltext

  https://www.nature.com/articles/s41562-021-01217-2

  https://www.scientificamerican.com/article/covid-has-created-a-perfect-storm-for-fringe-science/

  https://www.thelancet.com/coronavirus

  https://www.un.org/en/coronavirus

  https://www.nejm.org/covid-vaccine

  https://www.bmj.com/coronavirus

  https://www.who.int/emergencies/diseases/novel-coronavirus-2019`,
  },

  {
    question: `I noticed that many of the volunteers on this project are from IBM. Does IBM endorse this project? `,
    answer: `No. We are all individual volunteers who do not speak for or on behalf of IBM. We just happen to work there. We also have volunteers from Google, Shopify, OpenText and many other organizations lending their skills as individuals, not on behalf of their employers.`,
  },

  {
    question: `I want to set up a fundraising campaign to support your charity; how do I do that? `,
    answer: `Thank you very much for your interest in supporting us! Email us at donate@donatemask.ca and we will help get your fundraising initiative set up with you.`,
  },

  {
    question: `I've already submitted one request. Can I submit another one? `,
    answer: `We would prefer if you only placed a request once every 60 days but please request what you need to protect you and yours as often as you need.`,
  },

  {
    question: `I never received my request. What happened?`,
    answer: `We're sorry that your request hasn't arrived. It may have fallen through the cracks given the chaos of our growing pains and purely volunteer driven organization.   If you urgently need a status update, please email us at request@requestmask.ca and one of our volunteers will try to figure out what happened to your request.`,
  },

  {
    question: `I need to fulfill my mandatory volunteer hours for school/other purpose. Can you certify my volunteer hours?`,
    answer: `Yes. We would be glad to certify volunteer hours for whatever purpose. We're also glad to have students use this project as part of course work in any discipline and at any level and we will provide mentorship/oversight.  Feel free to reach out to us at volunteer@donatemask.ca to discuss further.`,
  },

  {
    question: `Why do you keep statistics for your initiative?`,
    answer: `We believe that data are incredibly important in pandemic response. One of the goals of this initiative is to identify just how much a gap there is in access to masks. That's why we track those data carefully.`,
  },

  {
    question: ` We would like to use some of your organization's source code in our own projects but need a different license than the open source licenses provided. Will you consider different licensing?`,
    answer: `Maybe. Reach out to us to discuss: contact@evidencebased.ca`,
  },

  {
    question: `I have a question not in this FAQ. Who do I contact?`,
    answer: `No doubt we haven't thought of all the questions you might have! Feel free to reach out to us at marketing@donatemask.ca with your questions. We'll update the FAQ accordingly.  Thank you!`,
  },
];
