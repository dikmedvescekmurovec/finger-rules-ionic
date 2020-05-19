export interface FingerRule {
  id: string;
  type: FingerRuleType;
  timestamp?: string;
  username: string;
  message: string;
  priorityLevelDescription?: string;
  priorityLevel: number;
}

export enum FingerRuleType {
  FUNNY_REMARK = 'Funny Remark',
  TECHNICAL = 'Technical Remark',
  TOO_LONG = 'Topic Too Long',
  REPLY = 'Reply',
  NEW_TOPIC = 'New Topic'
}