import { GetCurrectUserDetails } from "@/graphql/queries.js";
import Routers from "@/JSON/Routers.json";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export const getCurrentUserDetailsfile = {
  data: () => ({
    routerList: [],
  }),
  methods: {
    async getCurrentUserDetailsMethod() {
      try {
        this.overlay = true;
        this.routerList = Routers;
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
        if (this.getCurrentUserDetailsObject.user_type == "Member") {
          this.routerList = this.routerList.filter(
            (item) =>
              item.menuName !== "Settings" && item.menuName !== "Approvals"
          );
        }
        this.$store.commit(
          "SET_CURRENT_USER",
          this.getCurrentUserDetailsObject
        );
        this.overlay = false;
        return this.routerList;
      } catch (error) {
        this.overlay = false;
      }
    },
  },
};
