import React from 'react';

import StateHookExample from './state.hook.example';
import EffectHookExample from './effect.hook.example';
import CurrencyPairSelector from '../../components/ccy-pair-picker/CurrencyPairSelector';

export default function HookExamples() {
 
  return (
    <div>
     <StateHookExample></StateHookExample>
     <EffectHookExample></EffectHookExample>
     <CurrencyPairSelector></CurrencyPairSelector>
     </div>
  );
}