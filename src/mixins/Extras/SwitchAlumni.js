import { ListAllMyAlumnyes } from "@/graphql/queries.js";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export const getAllMyAlumnyes = {
  methods: {
    async getAllMyAlumnyesDetailsMethod() {
      try {
        this.AlumniList_Bool = true;
        const result = await client.graphql({
          query: ListAllMyAlumnyes,
          variables: {
            input: {
              alumnye_id:
                this.$store.getters.get_currentuser_details.alumnye_id,
              user_email_id:
                this.$store.getters.get_currentuser_details.user_email_id,
            },
          },
        });
        const response = JSON.parse(result.data.ListAllMyAlumnyes).data;
        console.log("LIST_MEMBERS_API", response);
        this.AlumniList_Bool = false;

        return response;
      } catch (error) {
        this.AlumniList_Bool = false;

        console.log("ALUMYE_USER", error);
        this.enableOverlay = false;
        //
      }
    },
  },
};
