import { useTranslation } from 'react-i18next';
import { CreateModifyVersionForm } from '../../components';
import { useNavigate } from 'react-router-dom';

export default function ModifyVersionProductPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const handleSubmit = () => {
		navigate(-1); // back to previous page
	};

	return (
		<div>
			<CreateModifyVersionForm
				title={t('modifyVersionProduct')}
				label={`${t('version')}`}
				onSubmit={handleSubmit}
				onCancel={() => navigate(-1)}
			/>
		</div>
	);
}
