import { ApproveOrRejectPendingMember } from "@/graphql/mutations.js";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export const approveRejectMemberApi = {
  methods: {
    async approveRejectMemberApiMethod(inputParams) {
      try {
        this.btnLoader = true;
        const result = await client.graphql({
          query: ApproveOrRejectPendingMember,
          variables: {
            input: inputParams,
          },
        });
        const response = JSON.parse(result.data.ApproveOrRejectPendingMember);
        console.log("APPROVE_REJ", result);
        this.btnLoader = false;
        return response;
        // console.log("MEMBER_CREATED", result);
      } catch (error) {
        this.btnLoader = false;
        //
      }
    },
  },
};
