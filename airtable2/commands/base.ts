import airtable from "airtable";
import { AIRTABLE_API_KEY } from "../configs";

airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: AIRTABLE_API_KEY
});

const base = airtable.base("app8ZbcPx7dkpOnP0");

export default base;