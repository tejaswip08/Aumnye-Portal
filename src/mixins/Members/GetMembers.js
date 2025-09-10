import { ListMembers } from "@/graphql/queries.js";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export const ListMembersData = {
  methods: {
    async ListMembersMethod() {
      try {
        this.enableOverlay = true;
        const result = await client.graphql({
          query: ListMembers,
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
        this.enableOverlay = false;
        const response = JSON.parse(result.data.ListMembers).data.items;
        console.log("LIST_MEMBERS_API", response);
        return response;
      } catch (error) {
        console.log("ALUMYE_USER", error);
        this.enableOverlay = false;
        //
      }
    },
  },
};
