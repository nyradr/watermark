import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { IQuestion } from '../icon/question';

export class Helper extends React.Component {

    render() {
        return (
            <OverlayTrigger trigger={['hover', 'focus']} placement="auto" overlay={ this.props.helper } class="me-2">
                <div class="text-primary">
                    <IQuestion></IQuestion>
                </div>
            </OverlayTrigger>
        );
    }
}