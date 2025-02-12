import { useEffect, useState } from 'react';
import {
	Typography,
	IconButton,
	Stack,
	Box,
	Chip,
	TextField,
	List,
	ListItem,
	ListItemText,
	TableCell,
	TableRow,
	Button,
	LinearProgress,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useTranslation } from 'react-i18next';
import {
	CollapsibleTable,
	CollapsibleTableRow,
	FilterableTable,
	FilterAction,
	TextEditor,
} from '../../components';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllFiles } from '../../redux/slices/FileSlice';
import { useNavigate } from 'react-router-dom';
import {
	deleteModuleById,
	selectAllModules,
} from '../../redux/slices/ModuleSlice';

const ProductVersionDetailPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showChangeLog, setShowChangeLog] = useState(false);
	const [version] = useState('1.0');

	const [moduleTablePage, setModuleTablePage] = useState<TablePage>({
		pageNumber: 0,
		pageSize: 5,
	});

	const files = useSelector(selectAllFiles);

	const modules = useSelector(selectAllModules);
	// const products = useGetAllProductsByUserId({
	// 	userId: 'd28bf637-280e-49b5-b575-5278b34d1dfe',
	// 	...productTablePage,
	// });

	const [loading, setLoading] = useState(true);

	// Giả lập API loading (nếu sau này có async API call thì thay bằng Redux Thunk hoặc RTK Query)
	useEffect(() => {
		setLoading(false); // Giả sử dữ liệu đã được lấy xong
	}, []);

	const [, setCurrVerProps] = useState({
		productId: '',
		versionName: '',
		status: false,
		pageNumber: 0,
		pageSize: 5,
	});

	// const notifications = useNotifications();
	// useEffect(() => {
	// 	if (products.error)
	// 		notifications.show(t('fetchError'), { severity: 'error' });
	// }, [notifications, products.error, t]);

	const handleDelete = (id: string) => {
		const confirmDelete = window.confirm(
			`Bạn có chắc chắn muốn xóa module ${id}?`,
		);
		if (confirmDelete) {
			dispatch(deleteModuleById(id));
			alert(`Đã xóa module ${id}`);
		}
	};

	return (
		<Stack>
			<Stack>
				<Typography variant="h5" textAlign="center">
					Tên sản phẩm ở đây
				</Typography>
				<Typography
					variant="caption"
					mb={3}
					textAlign="center"
					color="textSecondary"
				>
					ID: 3b5af8db-09ed-4e92-910b-f6889c55cdef
				</Typography>
			</Stack>
			<Stack>
				{/* Version, Status, Dates & Actions */}
				<Stack direction="row" alignItems="center" spacing={10} mb={3}>
					<Box display="flex" alignItems="center" gap={1}>
						<Typography variant="body2">Phiên bản:</Typography>
						<Typography variant="body2">
							<strong>{version}</strong>
						</Typography>
					</Box>
					<Box display="flex" alignItems="center" gap={1}>
						<Typography variant="body2">Trạng thái:</Typography>
						<Chip
							label="Đang hoạt động"
							color="primary"
							sx={{ fontWeight: 'bold' }}
							size="small"
						/>
					</Box>
					<Box display="flex" alignItems="center" gap={10}>
						<Typography variant="body2">
							Ngày tạo: <strong>04/03/2019</strong>
						</Typography>
						<Typography variant="body2">
							Cập nhật lần cuối: <strong>04/03/2019</strong>
						</Typography>

						<Box>
							<IconButton color="primary">
								<Edit />
							</IconButton>
							<IconButton color="error">
								<Delete />
							</IconButton>
						</Box>
					</Box>
				</Stack>
				<Stack>
					<Stack
						direction={'row'}
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						<Typography
							variant="body2"
							color="textSecondary"
							sx={{ opacity: 0.6 }}
						>
							{t('changeLog')}
						</Typography>
						<IconButton onClick={() => setShowChangeLog(!showChangeLog)}>
							{showChangeLog ? (
								<KeyboardArrowUpIcon />
							) : (
								<KeyboardArrowDownIcon />
							)}
						</IconButton>
					</Stack>
					<Stack mb={5}>
						{showChangeLog && (
							<Stack>
								<TextField
									id="filled-multiline-static"
									multiline
									rows={5}
									variant="filled"
									fullWidth
									disabled
								/>{' '}
								<List sx={{ marginTop: 2 }}>
									<Typography variant="h6">
										Danh sách file đã tải lên:
									</Typography>
									{files.length > 0 ? (
										files.map((file, index) => (
											<ListItem key={index}>
												<ListItemText
													primary={file.name}
													secondary={`${(file.size / 1024).toFixed(2)} KB`}
												/>
											</ListItem>
										))
									) : (
										<Typography variant="body2" color="textSecondary">
											{t('noFileUpload')}
										</Typography>
									)}
								</List>
							</Stack>
						)}
					</Stack>
				</Stack>

				<Box>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						sx={{ marginBottom: 2 }}
					>
						<FilterAction
							entries={[
								{ value: 'test', label: 'Test' },
								{ value: 'test2', label: 'Test2' },
							]}
							onFilterClick={(value, entry) => {
								console.log(value, entry);
							}}
						/>
						<Button
							variant="contained"
							// onClick={() => navigate(RoutePaths.CREATE_PRODUCT)}
							onClick={() => navigate('/create-module')}
						>
							{t('addModule')}
						</Button>
					</Stack>

					{loading ? (
						<LinearProgress />
					) : (
						<CollapsibleTable
							headers={
								<>
									<TableCell key="name">{t('moduleName')}</TableCell>
									<TableCell key="createdAt" align="center">
										{t('dateCreated')}
									</TableCell>
									<TableCell key="updatedAt" align="center">
										{t('lastUpdated')}
									</TableCell>
									<TableCell key="status" align="center">
										{t('status')}
									</TableCell>
									<TableCell />
									<TableCell />
								</>
							}
							rows={modules}
							count={modules.length ?? 0}
							pageNumber={moduleTablePage.pageNumber}
							pageSize={moduleTablePage.pageSize}
							onPageChange={(newPage) => setModuleTablePage(newPage)}
							getCell={(row) => (
								<CollapsibleTableRow
									key={row.id}
									cells={
										<>
											<TableCell align="justify" component="th" scope="row">
												{row.name}
											</TableCell>
											<TableCell align="center">{row.createdAt}</TableCell>
											<TableCell align="center">
												{row.updatedAt ?? ''}
											</TableCell>
											<TableCell align="center">{t(row.status)}</TableCell>
											<TableCell align="center">
												<IconButton
													onClick={() =>
														navigate(`${RoutePaths.MODIFY_PRODUCT}/${row.id}`)
													}
												>
													<EditIcon color="info" />
												</IconButton>
												<IconButton onClick={() => handleDelete(row.id)}>
													<DeleteIcon color="error" />
												</IconButton>
											</TableCell>
										</>
									}
									inner={
										<>
											<Typography
												variant="caption"
												gutterBottom
												component="div"
											>
												ID: {row.id}
											</Typography>
											<Box
												component="form"
												sx={{
													'& .MuiTextField-root': {
														marginBottom: 1,
														marginTop: 1,
														width: '100%',
													},
												}}
												noValidate
												autoComplete="off"
											>
												<Stack
													mt={1}
													mb={2}
													sx={{
														width: '100%',
													}}
												>
													<TextEditor value={row.description} readOnly />
												</Stack>

												<FilterableTable
													filterableCols={[
														{
															key: 'name',
															label: 'Phiên bản',
														},
													]}
													headers={
														<>
															<TableCell key={`name`}>
																{t('deployDocumentName')}
															</TableCell>
															<TableCell key={`productName`} align="center">
																{t('productName')}
															</TableCell>
															<TableCell key={`productVer`} align="center">
																{t('version')}
															</TableCell>
															<TableCell key={`moduleName`} align="center">
																{t('moduleName')}
															</TableCell>
															<TableCell key={`moduleVer`} align="center">
																{t('version')}
															</TableCell>
															<TableCell key={`createAt`} align="center">
																{t('dateCreated')}
															</TableCell>
															<TableCell key={`updateAt`} align="center">
																{t('lastUpdated')}
															</TableCell>
															<TableCell />
															<TableCell />
														</>
													}
													count={modules.length ?? 0}
													rows={modules}
													pageNumber={moduleTablePage.pageNumber}
													pageSize={moduleTablePage.pageSize}
													onPageChange={(newPage) =>
														setModuleTablePage(newPage)
													}
													onAddClick={() => navigate(`/create-deploy-document`)}
													addButtonText={t('addDocument')}
													getCell={(row) => (
														<TableRow key={row.id}>
															<TableCell key={`moduleName`}>
																{row.name}
															</TableCell>
															<TableCell key={`createAt`} align="center">
																{row.createdAt}
															</TableCell>
															<TableCell key={`updateAt`} align="center">
																{row.updatedAt}
															</TableCell>
															<TableCell
																key={`moduleStatus`}
																align="center"
															></TableCell>
															<TableCell>
																<Stack direction="row">
																	<IconButton size="small" onClick={() => {}}>
																		<RemoveRedEyeIcon />
																	</IconButton>
																	<IconButton size="small" onClick={() => {}}>
																		<EditIcon />
																	</IconButton>
																	<IconButton
																		size="small"
																		onClick={() => handleDelete(row.id)}
																	>
																		<DeleteIcon />
																	</IconButton>
																</Stack>
															</TableCell>
														</TableRow>
													)}
												/>
											</Box>
										</>
									}
									onExpand={() => {
										setCurrVerProps({
											productId: row.id,
											versionName: '',
											status: false,
											pageNumber: 0,
											pageSize: 5,
										});
									}}
								/>
							)}
						/>
					)}
				</Box>
			</Stack>
		</Stack>
	);
};

export default ProductVersionDetailPage;
