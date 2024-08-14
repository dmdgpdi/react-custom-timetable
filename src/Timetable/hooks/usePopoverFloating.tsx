import { useState, useEffect } from 'react';
import {
  useFloating,
  offset,
  useDismiss,
  useInteractions,
  useHover,
  shift,
  safePolygon,
} from '@floating-ui/react';
import { useRequestAnimationFrame } from './useRequestAnimationFrame';
import { PopoverType } from '../components/Timetable.type';

function usePopoverFloating(popoverType: PopoverType) {
  const [isFloatingTargetVisible, setIsFloatingTargetVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-start',
    strategy: 'absolute',
    middleware: [
      offset(
        ({ rects }) => {
          const { x, y } = position;
          const { height } = rects.reference;
          const referenceClientRect =
            refs.reference.current?.getBoundingClientRect();
          const refY: number = referenceClientRect?.y ?? 0;
          const refX: number = referenceClientRect?.x ?? 0;

          return {
            mainAxis: y - height - refY,
            crossAxis: x - refX,
          };
        },
        [position.x, position.y],
      ),
      shift({ crossAxis: true }),
    ],
    open: isFloatingTargetVisible,
    onOpenChange: setIsFloatingTargetVisible,
  });

  const dismiss = useDismiss(context, { outsidePress: true });
  const hover = useHover(context, {
    enabled: popoverType === 'HOVER',
    handleClose: safePolygon(),
  });

  const interactions = [dismiss, hover];
  const { getReferenceProps, getFloatingProps } = useInteractions(interactions);

  const handleMouseMove = useRequestAnimationFrame((event: MouseEvent) => {
    const { clientX, clientY } = event;
    setPosition({ x: clientX + 5, y: clientY + 5 });
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = event;
    setPosition({ x: clientX, y: clientY });
    setIsFloatingTargetVisible(true);
  };

  useEffect(() => {
    if (popoverType === 'HOVER') {
      const refElement = refs.reference?.current as HTMLElement | null;

      if (!refElement) return undefined;

      refElement.addEventListener('mousemove', handleMouseMove);

      return () => {
        refElement.removeEventListener('mousemove', handleMouseMove);
      };
    }
    return undefined;
  }, [popoverType]);

  const hidePopover = () => {
    setIsFloatingTargetVisible(false);
  };

  return {
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
    isFloatingTargetVisible,
    fixFloatingTargetPosition:
      popoverType === 'CLICK' ? handleClick : undefined,
    hidePopover,
  };
}

export default usePopoverFloating;
