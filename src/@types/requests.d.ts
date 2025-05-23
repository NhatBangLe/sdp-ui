declare interface FileCreateRequest {
	file: File;
	userId: string;
}

declare interface CustomerCreateRequest {
	name: string;
	email: string;
	userId: string;
}

declare interface CustomerUpdateRequest {
	name: string;
	email: string;
	customerId: string;
}

declare interface SoftwareCreateRequest {
	name: string;
	description?: string?;
	userId: string;
}

declare interface SoftwareUpdateRequest {
	name: string;
	description?: string?;
	softwareId: string;
}

declare interface SoftwareVersionCreateRequest {
	name: string;
	description?: string?;
	softwareId: string;
}

declare interface SoftwareVersionUpdateRequest {
	name: string;
	description?: string?;
	versionId: string;
}

declare interface ModuleCreateRequest {
	name: string;
	description?: string?;
	softwareVersionId: string;
}

declare interface ModuleUpdateRequest {
	name: string;
	description?: string?;
	moduleId: string;
}

declare interface ModuleVersionCreateRequest {
	name: string;
	description?: string?;
	moduleId: string;
}

declare interface ModuleVersionUpdateRequest {
	name: string;
	description?: string?;
	moduleVersionId: string;
}

declare interface DeploymentProcessCreateRequest {
	userId: string;
	softwareVersionId: string;
	customerId: string;
	moduleVersionIds: string[];
}

declare interface DeploymentProcessUpdateRequest {
	processId: number;
	status: DeploymentProcessStatus;
}

declare interface DeploymentProcessMemberUpdateRequest {
	processId: number;
	memberId: string;
	operator: MemberOperator;
}

declare type MemberOperator = 'ADD' | 'REMOVE';
declare interface DeploymentPhaseTypeCreateRequest {
	userId: string;
	name: string;
	description?: string?;
}

declare interface DeploymentPhaseTypeUpdateRequest {
	typeId: string;
	name: string;
	description?: string?;
}

declare interface DeploymentPhaseCreateRequest {
	processId: number;
	numOrder: number;
	description?: string?;
	typeId: string;
	plannedStartDate: string;
	plannedEndDate: string;
}

declare interface DeploymentPhaseUpdateRequest {
	phaseId: string;
	numOrder: number;
	description?: string?;
	plannedStartDate: string;
	plannedEndDate: string;
}

declare interface DeploymentPhaseMemberUpdateRequest {
	phaseId: string;
	memberId: string;
	operator: MemberOperator;
}

declare interface DeploymentPhaseAttachmentUpdateRequest {
	phaseId: string;
	attachmentId: string;
	operator: FileOperator;
}

declare interface DeploymentPhaseUpdateActualDatesRequest {
	phaseId: string;
	description?: string?;
	actualStartDate?: string?;
	actualEndDate?: string?;
	updatedByUserId: string;
}

declare interface DocumentTypeCreateRequest {
	name: string;
	description?: string?;
	userId: string;
}

declare interface DocumentTypeUpdateRequest {
	name: string;
	description?: string?;
	typeId: string;
}

declare interface SoftwareDocumentCreateRequest {
	name: string;
	description?: string?;
	documentTypeId: string;
	softwareVersionId: string;
	attachmentIds?: string[]?;
}

declare interface SoftwareDocumentUpdateRequest {
	name: string;
	description?: string?;
	softwareDocumentId: string;
}

declare interface SoftwareDocumentAttachmentUpdateRequest {
	documentId: string;
	attachmentId: string;
	operator: FileOperator;
}

declare interface ModuleDocumentCreateRequest {
	name: string;
	description?: string?;
	documentTypeId: string;
	moduleVersionId: string;
	attachmentIds?: string[]?;
}

declare interface ModuleDocumentUpdateRequest {
	name: string;
	description?: string?;
	moduleDocumentId: string;
}

declare interface ModuleDocumentAttachmentUpdateRequest {
	documentId: string;
	attachmentId: string;
	operator: FileOperator;
}

declare interface MailTemplateCreateRequest {
	subject: string;
	content: string;
	type: MailTemplateType;
	userId: string;
}

declare interface MailTemplateUpdateRequest {
	subject: string;
	content: string;
	type: MailTemplateType;
	templateId: string;
}

declare interface NotificationHistoryRequest {
	numOrder: number;
	notificationId: number;
	userId: string;
}

declare interface SoftwareLicenseCreateRequest {
	userId: string;
	processId: number;
	description?: string?;
	startTimeMs: number;
	endTimeMs: number;
	expireAlertIntervalDay: number;
}

declare interface SoftwareLicenseUpdateRequest {
	licenseId: string;
	description?: string?;
	expireAlertIntervalDay: number;
}
