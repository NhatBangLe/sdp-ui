import {
	productApi,
	useGetAllProductsByUserIdQuery as useGetAllProductsByUserId,
	useGetProductByIdQuery as useGetProductById,
	usePostProductMutation as useCreateProduct,
	usePutProductMutation as useUpdateProduct,
	useDeleteProductMutation as useDeleteProduct,
} from './product';
import {
	productVersionApi,
	useGetAllVersionsByProductIdQuery as useGetAllVersionsByProductId,
} from './product-version';
import {
	documentLabelApi,
	useGetAllDocumentLabelsByUserIdQuery as useGetAllDocumentLabelsByUserId,
	usePostDocumentLabelMutation as useCreateDocumentLabel,
	useGetLabelByIdQuery as useGetDocumentLabelById,
	usePutLabelMutation as useUpdateDocumentLabel,
	useDeleteLabelMutation as useDeleteDocumentLabel,
} from './document-label';

export {
	productApi,
	useGetAllProductsByUserId,
	useGetProductById,
	useCreateProduct,
	useUpdateProduct,
	useDeleteProduct,
};
export { productVersionApi, useGetAllVersionsByProductId };
export {
	documentLabelApi,
	useGetAllDocumentLabelsByUserId,
	useCreateDocumentLabel,
	useGetDocumentLabelById,
	useUpdateDocumentLabel,
	useDeleteDocumentLabel,
};
