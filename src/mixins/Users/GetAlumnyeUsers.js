import { ListAlumnyeUsers } from "@/graphql/queries.js";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export const listAlumnyeUsers = {
  methods: {
    async ListAlumnyeUsers() {
      try {
        this.enableOverlay = true;
        const result = await client.graphql({
          query: ListAlumnyeUsers,
          variables: {
            input: {
              alumnye_id:
                this.$store.getters.get_currentuser_details.alumnye_id,
              user_id: this.$store.getters.get_currentuser_details.user_id,
              //   user_type: this.$store.getters.get_currentuser_details.user_type,
              limit: 50,
              next_token: undefined,
            },
          },
        });
        this.enableOverlay = false;
        const response = JSON.parse(result.data.ListAlumnyeUsers).data.items;
        console.log("LIST_USER_API", response);
        return response;
      } catch (error) {
        console.log("ALUMYE_USER", error);
        this.enableOverlay = false;
        //
      }
    },
  },
};
