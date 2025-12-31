'use client';

import { styled, Paper } from '@mui/material';
import { alpha } from '@mui/material/styles';

export const GlassPaper = styled(Paper, {
    shouldForwardProp: (prop) => prop !== 'glow' && prop !== 'customPadding' && prop !== 'customMaxWidth'
})<{ glow?: boolean; customPadding?: string | number; customMaxWidth?: string | number }>(
    ({ theme, glow, customPadding, customMaxWidth }) => {
        const c = theme.palette.custom;

        return {
            position: 'relative',
            background: `linear-gradient(
                135deg, 
                ${alpha(c.lightNavy, 0.6)} 0%, 
                ${alpha(c.navy, 0.4)} 100%
            )`,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '16px',
            border: `1px solid ${alpha(c.lightestSlate, 0.1)}`,
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            padding: theme.spacing(typeof customPadding === 'number' ? customPadding : 4),
            maxWidth: customMaxWidth || '100%',
            width: '100%',
            color: theme.palette.text.primary,
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out',
            zIndex: 1,

            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: -100,
                width: '200%',
                height: '100%',
                background: `linear-gradient(
                    90deg, 
                    transparent, 
                    ${alpha('#ffffff', 0.03)}, 
                    transparent
                )`,
                transform: 'skewX(-20deg)',
                pointerEvents: 'none',
                transition: 'transform 0.5s',
            },

            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: `0 12px 40px 0 rgba(0, 0, 0, 0.5)`,
                border: `1px solid ${glow ? alpha(c.green, 0.3) : alpha(c.lightestSlate, 0.2)}`,

                '&::before': {
                    transform: 'skewX(-20deg) translateX(50%)',
                }
            },

            ...(glow && {
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-50px',
                    right: '-50px',
                    width: '100px',
                    height: '100px',
                    background: c.green,
                    filter: 'blur(60px)',
                    opacity: 0.15,
                    zIndex: -1,
                    borderRadius: '50%',
                }
            })
        };
    }
);