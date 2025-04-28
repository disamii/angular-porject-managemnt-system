// evaluator.model.ts

export interface UserInfo {
  id:number,
  name: string;
  userName: string;
  phoneNumber?: string;  // optional
  email: string;
  researchInterests: string;
  academicPosition: string;
  academicDegreeLevel: string;
  fieldOfStudy: string;
}
export interface EvaluatorBase {
  expertise: string;
  maxAssignments: number;
  type: "DOCUMENT_REVIEWER" | "PRESENTATION_REVIEWER";
}

export interface EvaluatorRequest extends EvaluatorBase {
  userId: number;  // Reference to an existing user by their ID
}

export interface EvaluatorResponse extends EvaluatorBase {
id:number;
publicId:string;
evaluator: UserInfo; 
}
