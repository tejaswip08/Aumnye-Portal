import { UpdateMyDetails } from "@/graphql/mutations.js";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export const updateCurrentUsers = {
  methods: {
    async updateCurrentUserMethod(inputParams) {
      try {
        const result = await client.graphql({
          query: UpdateMyDetails,
          variables: {
            input: inputParams,
          },
        });
        const response = JSON.parse(result.data.UpdateMyDetails);
        return response;
        // console.log("MEMBER_CREATED", result);
      } catch (error) {
        this.btnLoader = false;
        console.log("current", error);
        //
      }
    },
  },
};
