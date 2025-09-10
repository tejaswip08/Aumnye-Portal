import { CreateAlumnyeUser } from "@/graphql/mutations.js";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export const createAlumnyeUser = {
  methods: {
    async createAlumnyeUserMethod(inputParams) {
      try {
        console.log("API_METHOD_IS_CALLING");
        const result = await client.graphql({
          query: CreateAlumnyeUser,
          variables: {
            input: inputParams,
          },
        });
        const response = JSON.parse(result.data.CreateAlumnyeUser);
        return response;
      } catch (error) {
        //
      }
    },
  },
};
