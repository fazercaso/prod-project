import { Button } from 'shared/ui/Button/Button';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const BugButton = () => {
    const [error, setError] = useState(false);
    const { t } = useTranslation();
    const onThrow = () => setError(true);

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    return (
        <Button
            onClick={onThrow}
        // eslint-disable-next-line i18next/no-literal-string
        >
            {t('Тест ошибки ErrorBoundary')}
        </Button>
    );
};
