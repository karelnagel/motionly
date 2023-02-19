import S3 from "aws-sdk/clients/s3";
import Transcribe from "aws-sdk/clients/transcribeservice";
import { awsClientConfig } from "../helpers/awsClientConfig";

export const s3 = new S3(awsClientConfig);
export const transcribe = new Transcribe(awsClientConfig);
