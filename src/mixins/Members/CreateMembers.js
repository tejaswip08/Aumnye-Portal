import { CreateMember } from "@/graphql/mutations.js";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export const createMember = {
  methods: {
    async createMemberMethod(inputParams) {
      try {
        console.log("API_METHOD_IS_CALLING");
        const result = await client.graphql({
          query: CreateMember,
          variables: {
            input: inputParams,
          },
        });
        const response = JSON.parse(result.data.CreateMember);
        return response;
        // console.log("MEMBER_CREATED", result);
      } catch (error) {
        //
      }
    },
  },
};
