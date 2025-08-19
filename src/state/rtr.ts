import { useAPIsState } from '@/store/APIsStore';

type UseRTRRendered = ReturnType<typeof useAPIsState<'rtrRendered'>>;
export function useRTRRendered(): UseRTRRendered {
  const [rtrRendered, setRTRRendered] = useAPIsState('rtrRendered');
  return [rtrRendered, setRTRRendered];
}

type UseRTRAPIReady = ReturnType<typeof useAPIsState<'rtrApiReady'>>;
export function useRTRAPIReady(): UseRTRAPIReady {
  const [rtrApiReady, setRTRAPIRendered] = useAPIsState('rtrApiReady');
  return [rtrApiReady, setRTRAPIRendered];
}

type UseRTRError = ReturnType<typeof useAPIsState<'rtrError'>>;
export function useRTRError(): UseRTRError {
  const [rtrError, setRTRError] = useAPIsState('rtrError');
  return [rtrError, setRTRError];
}

type UseRTRDisabled = ReturnType<typeof useAPIsState<'rtrDisabled'>>;
export function useRTRDisabled(): UseRTRDisabled {
  const [rtrDisabled, setRTRDisabled] = useAPIsState('rtrDisabled');
  return [rtrDisabled, setRTRDisabled];
}
