import React from 'react';
import styled from 'styled-components';
import { Translation, TroubleshootingTips } from '@suite-components';
import { Button } from '@trezor/components';
import { useActions } from '@suite-hooks';
import * as routerActions from '@suite-actions/routerActions';

const WhiteSpace = styled.div`
    min-width: 60px;
`;

interface DeviceBootloaderProps {
    trezorModel?: number;
}

/* User connected the device in bootloader mode, but in order to continue it needs to be in normal mode */
export const DeviceBootloader = ({ trezorModel }: DeviceBootloaderProps) => {
    const { goto } = useActions({
        goto: routerActions.goto,
    });

    const tips = [
        {
            key: 'device-bootloader',
            heading: <Translation id="TR_DEVICE_CONNECTED_BOOTLOADER_RECONNECT" />,
            description:
                trezorModel === 1 ? (
                    <Translation id="TR_DEVICE_CONNECTED_BOOTLOADER_RECONNECT_IN_NORMAL_MODEL_1" />
                ) : (
                    <Translation id="TR_DEVICE_CONNECTED_BOOTLOADER_RECONNECT_IN_NORMAL_MODEL_2" />
                ),
            noBullet: true,
            action: <WhiteSpace />, // To make the layout bit nicer - prevent floating above button on the next row.
        },
        {
            key: 'wipe-or-update',
            heading: <Translation id="TR_WIPE_OR_UPDATE" />,
            description: <Translation id="TR_WIPE_OR_UPDATE_DESCRIPTION" />,
            noBullet: true,
            action: (
                <Button
                    onClick={() => {
                        goto('settings-device');
                    }}
                    icon="SETTINGS"
                    size={20}
                />
            ),
        },
    ];

    return (
        <TroubleshootingTips
            label={<Translation id="TR_DEVICE_IN_BOOTLOADER" />}
            items={tips}
            opened
        />
    );
};
