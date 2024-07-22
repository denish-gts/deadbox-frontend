import jira from "../../public/assets/icons/jira.png";
import linear from "../../public/assets/icons/linear.png";
import ms_word from "../../public/assets/icons/ms_word.png";
import notion from "../../public/assets/icons/notion.png";
import slack from "../../public/assets/icons/slack.png";
import zendesk from "../../public/assets/icons/zendesk.png";

const INTEGRATIONS = [
  {
    title: "Slack",
    icon: slack,
    integrated: true,
    description:
      "Authorize with Slack to report any activity directly inside your channel",
  },
  {
    title: "Jira",
    icon: jira,
    integrated: true,
    description:
      "Authorize with Jira for issue and ticket tracking and management",
  },
  {
    title: "Microsoft Word",
    icon: ms_word,
    integrated: false,
    description:
      "Authorize with Word to import any document directly inside Foundly",
  },
  {
    title: "Zendesk",
    icon: zendesk,
    integrated: false,
    description:
      "Authorize with Zendesk to report any activity directly inside your channel",
  },
  {
    title: "Notion",
    icon: notion,
    integrated: false,
    description:
      "Authorize with Notion to report any activity directly inside your channel",
  },
  {
    title: "Linear",
    icon: linear,
    integrated: false,
    description:
      "Authorize with Linear to report any activity directly inside your channel",
  },
];

const CREDITS = [
  {
    id: 1,
    creditInfo: "50",
    creditPrice: "450",
  },
  {
    id: 2,
    creditInfo: "100",
    creditPrice: "600",
  },
  {
    id: 3,
    creditInfo: "150",
    creditPrice: "700",
  },
];


export {
    INTEGRATIONS,
    CREDITS
}