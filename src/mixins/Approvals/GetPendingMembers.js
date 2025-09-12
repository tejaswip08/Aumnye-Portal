import { ListPendingMembers } from "@/graphql/queries.js";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export const listPendingMembersData = {
  methods: {
    async listPendingMembersDataMethod(inputParams) {
      try {
        this.enableOverlay = true;
        const result = await client.graphql({
          query: ListPendingMembers,
          variables: {
            input: {
              alumnye_id:
                this.$store.getters.get_currentuser_details.alumnye_id,
              user_id: this.$store.getters.get_currentuser_details.user_id,
              limit: 50,
              next_token: undefined,
            },
          },
        });
        const response = JSON.parse(result.data.ListPendingMembers).data.items;
        console.log("PENDING_MEM", response);
        this.enableOverlay = false;
        return response;
        // console.log("MEMBER_CREATED", result);
      } catch (error) {
        this.enableOverlay = false;
        //
      }
    },
  },
};
