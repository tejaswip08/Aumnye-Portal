import { GetCurrectUserDetails } from "@/graphql/queries.js";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export const getCurrentUserDetailsfile = {
  data: () => ({}),
  methods: {
    async getCurrentUserDetailsMethod() {
      try {
        this.overlay = true;
        let result = await client.graphql({
          query: GetCurrectUserDetails,
          variables: {
            input: {
              user_email_id: this.$store.getters.get_user_email,
            },
          },
        });
        console.log("result", result);
        this.getCurrentUserDetailsObject = JSON.parse(
          result.data.GetCurrectUserDetails
        ).data.items;
        console.log("Current User", this.getCurrentUserDetailsObject);
        this.$store.commit(
          "SET_CURRENT_USER",
          this.getCurrentUserDetailsObject
        );
        this.overlay = false;
      } catch (error) {
        this.overlay = false;
        console.log("error Current User", error);
        // this.$router.push("/");
      }
    },
  },
};
