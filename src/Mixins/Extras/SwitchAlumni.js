import { ListAllMyAlumnyes } from "@/graphql/queries.js";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export const getAllMyAlumnyes = {
  data: () => ({}),
  methods: {
    async getAllMyAlumnyesDetailsMethod() {
      try {
        this.overlay = true;
        let result = await client.graphql({
          query: ListAllMyAlumnyes,
          variables: {
            input: {
              user_email_id:
                this.$store.getters.get_currentuser_details.user_email_id,
              alumnye_id:
                this.$store.getters.get_currentuser_details.alumnye_id,
            },
          },
        });
        console.log("result", result);
        this.getAllMyAlumnyesDetailsObject = JSON.parse(
          result.data.ListAllMyAlumnyes
        ).data.items;
        console.log("My Alumnees", this.getAllMyAlumnyesDetailsObject);

        this.overlay = false;
      } catch (error) {
        this.overlay = false;
        console.log("error Current User", error);
        // this.$router.push("/");
      }
    },
  },
};
