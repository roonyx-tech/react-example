import React, { useContext } from 'react';

import { Badge } from '~/components/shared/Badge';
import { prettyNum } from '~/functions';
import { Loading } from '~/components/shared/Loading';
import { AuthContext } from '~/components/shared/AuthContext';
import { Permission } from '~/interfaces';
import s from './Verification.module.scss';

interface IVerification {
  data: any;
}

export const Verification: React.FC<IVerification> = ({ data }: IVerification): JSX.Element => {
  // const { data: teoIndicatorsData, loading } = useQuery(teoIndicators, {
  //   variables: {
  //     teoId,
  //   },
  //   skip: tablesSavingInProgress,
  //   fetchPolicy: 'network-only',
  // });

  const { account } = useContext(AuthContext);
  const extendedIndicators = Boolean(account?.permissions.includes(Permission.extendedIndicators));

  if (data) {
    const { errors, irr, /*irrCurrent,*/ pp, ebitda, dpp, npv } = data.teoIndicators;
    return (
      <div className={s.wrapper}>
        <div className={s.cardsRow}>
          <Badge titles={['IRR план.']}>
            <span>
              <strong>{errors?.irr ? 'Ошибка расчета' : irr}</strong>
              {!errors?.irr && ' %'}
            </span>
          </Badge>
          {extendedIndicators && (
            <Badge titles={['PP']}>
              <span>
                <strong>{Math.ceil(pp)}</strong> мес.
              </span>
            </Badge>
          )}
          <Badge titles={['EBITDA']}>
            <span>
              <strong>{prettyNum(ebitda)}</strong>
              {' тыс. ₽'}
            </span>
          </Badge>
          {extendedIndicators && (
            <Badge titles={['DPP']}>
              <span>
                <strong>{Math.ceil(dpp)}</strong>
                {' мес.'}
              </span>
            </Badge>
          )}
          <Badge titles={['NPV']}>
            <span>
              <strong>{prettyNum(npv)}</strong>
              {' тыс. ₽'}
            </span>
          </Badge>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
};
