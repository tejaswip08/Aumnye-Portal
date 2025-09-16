import { ListMasterSettings } from "@/graphql/mutations";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

export const ListMasterSettingsData = {
  methods: {
    async listMasterSettingsMethod() {
      try {
        this.enableOverlay = true;
        const result = await client.graphql({
          query: ListMasterSettings,
          variables: {
            input: {
              alumnye_id:
                this.$store.getters.get_currentuser_details.alumnye_id,
              user_id: this.$store.getters.get_currentuser_details.user_id,
            },
          },
        });
        const response = JSON.parse(result.data.ListMasterSettings).data.items;
        console.log("PENDING_MEM", response);
        this.courseMaster =
          response[0].alumnye_universal_settings[0].setting_list;
        this.departmentMaster =
          response[0].alumnye_universal_settings[1].setting_list;
        this.hostelMaster =
          response[0].alumnye_universal_settings[2].setting_list;
        console.log("ResultObj", ResultObj);
        this.enableOverlay = false;
        return ResultObj;
      } catch (error) {
        this.enableOverlay = false;
        //
      }
    },
  },
};
