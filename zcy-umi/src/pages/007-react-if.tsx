import React from 'react';
import { If, Then, Else, Switch, Case, Default } from 'react-if';

const Index = () => {
  return (
    <div>
      <h2>If, Then, Else</h2>
      <div>
        <If condition={false}>
          <Then>1</Then>
          <Else>2</Else>
        </If>
        <br />
        <If condition={false}>
          <Then>3</Then>

          <Else>
            <If condition={false}>4</If>
            <Else>5</Else>
          </Else>
        </If>
      </div>
      <h2>Switch, Case, Default</h2>
      <div>
        <Switch>
          <Case condition={false}>
            6
          </Case>
          <Case condition={true}>
            7
          </Case>
          <Default>
            8
          </Default>
        </Switch>
      </div>
    </div>
  );
};

export default Index;
