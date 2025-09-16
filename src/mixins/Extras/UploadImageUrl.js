import { uploadData, getUrl } from "aws-amplify/storage";

export const CommonUploadFile = {
  data: () => ({}),
  methods: {
    async CommonUploadFileMethod(key, file) {
      try {
        console.log("Key", key, file);
        const result = await uploadData({
          path: key,
          data: file,
        }).result;
        console.log("Result", result);
        return {
          status: "SUCCESS",
          key: key,
          url: key,
          file: file,
        };
      } catch (error) {
        console.log("Err", error);
      }
    },
    async GetImageFromS3Method(file_key) {
      try {
        console.log("Type", typeof file_key);
        const result = await getUrl({
          path: file_key,
          options: {
            bucket: "alumnye",
          },
        });
        return result;
      } catch (error) {
        console.log("Err", error);
      }
    },
  },
};
