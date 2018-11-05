import React from "react";
import styled from "src/typed-components";
import stacks from "src/stacks";

const StackWrapper = styled.div`
  display: flex;
  flex: 1;
  font-size: 20px;
  padding: 8px;
  overflow-x: hidden;
  margin-left: 20px;
`;

const SingleStack = styled.button`
  display: flex;
  margin-right: 5px;
  align-items: center;
  background-color: white;
  border: none;
  cursor: pointer;
`;

const StackImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 3px;
  margin-right: 4px;
`;

const StackSpan = styled.span`
  font-weight: 700;
  font-size: 20px;
`;

const StackPresenter = ({ stack, stackFilter }) => (
  <StackWrapper>
    {stack.map(item => (
      <SingleStack onClick={() => stackFilter(item)} style={{ marginRight: "8px" }} key={item}>
        <StackImage src={stacks.find(s => s.name === item)!.image} />
        <StackSpan>{item}</StackSpan>
      </SingleStack>
    ))}
  </StackWrapper>
);

export default StackPresenter;
