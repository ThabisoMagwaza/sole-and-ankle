import React from 'react';
import styled from 'styled-components/macro';

import SHOES from '../../data';
import ShoeCard from '../ShoeCard';

const ShoeGrid = () => {
  const wrapperRef = React.useRef();
  const [elemetWidth, setElementWidth] = React.useState(0);

  React.useEffect(() => {
    function updateCardWidth() {
      const cards = wrapperRef.current.children;

      const firstElWidth = cards[0].getBoundingClientRect().width;

      setElementWidth(firstElWidth);
    }

    window.addEventListener('resize', updateCardWidth);

    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  React.useEffect(() => {
    // set the width of the last element to that of the first element
    const cards = wrapperRef.current.children;

    const lastCard = cards[cards.length - 1];

    lastCard.style.width = elemetWidth;
  }, [elemetWidth]);

  return (
    <Wrapper ref={wrapperRef}>
      {SHOES.map((shoe) => (
        <ShoeWrapper
          key={shoe.slug}
          style={{
            '--width': `${elemetWidth}px`,
          }}
        >
          <ShoeCard {...shoe} />
        </ShoeWrapper>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
`;

const ShoeWrapper = styled.div`
  flex: 1 1 275px;

  &:last-child {
    max-width: var(--width);
  }
`;

export default ShoeGrid;
