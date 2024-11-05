// import { UserJwtDetailsDTO } from "@modules/User/user.dtos";
import { Request as ExpressRequest } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface ResponseDto {
  status?: boolean;
  data?: any;
  message?: string;
  error?: any;
  details?: string;
  statusCode?: number;
  errorMessage?: any;
  errorDetails?: any;
}
export interface Request extends ExpressRequest {
  user?: string | JwtPayload;
}
export { ExpressRequest };

export interface FunctionalResponseDto {
  api_status?: number;
  message?: string;
  data?: any;
  error?: [
    {
      error_code?: number;
      error_msg?: string;
    },
  ];
  detail?: any;
  errorMessage?: any;
}

export enum Roles {
  "ADMIN" = "ADMIN",
  "USER" = "USER",
}

export enum TriggeredType {
  "NOTIFICATIONS" = "NOTIFICATIONS",
  "ALERTS" = "ALERTS",
}

export enum TriggeredSubType {
  "SMS" = "SMS",
  "EMAIL" = "EMAIL",
  "PUSHNOTIFICATION" = "PUSHNOTIFICATION",
  "WEBNOTIFICATION" = "WEBNOTIFICATION",
}

export interface PaginationDto {
  filter?: string;
  search?: string;
  page?: number;
  limit?: number;
  brand?: string;
  status?: number;
}

export interface SendingMailDto {
  subject?: string;
  template_id: number;
  user_ids: number[];
  template_fields?: any;
  workflow_id?: number;
}
export interface TriggeringMailDto {
  event_id: number;
  event_type: string;
  template_id?: number;
  user_ids?: number[];
  duration?: number;
  workflow_id: number;
  triggered_type?: string;
  triggered_sub_type?: string;
  message?: string;
  event_sub_type?: string;
  scheduled_time?: string;
  selected_field?: string;
}

export enum EventTypes {
  "ADMIN" = "ADMIN",
  "USER" = "USER",
  "AUTOMATED" = "AUTOMATED",
}

export enum EventSubTypes {
  "DAILY" = "DAILY",
  "PRIOR" = "PRIOR",
  "IMMEDIATE" = "IMMEDIATE",
}

export enum TableFields {
  "DATE_OF_BIRTH" = "DATE_OF_BIRTH",
  "SUBSCRIPTION_END_DATE" = "SUBSCRIPTION_END_DATE",
}