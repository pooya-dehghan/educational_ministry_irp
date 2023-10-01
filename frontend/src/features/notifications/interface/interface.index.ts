export interface GetNotificationRequest {}

export interface GetNotificationResponse {}

export interface GetAllNotificationRequest {
  unSeen : boolean
}

export interface GetAllNotificationResponse {}

export interface SeenNotificationRequest {
  id: number
}

export interface SeenNotificationResponse {}
