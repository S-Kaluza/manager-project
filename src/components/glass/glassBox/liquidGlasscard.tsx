import {GlassPaper} from "@/components/glass/glassBox/glassBox";

interface LiquidGlassCardProps {
    children: React.ReactNode;
    glow?: boolean; // Opcjonalna poświata w kolorze green
    padding?: string | number;
    maxWidth?: string | number;
    marginTop?: string | number;
    marginBottom?: string | number;
    marginLeft?: string | number;
    marginRight?: string | number;
    maxHeight?: string | number;
    overflowY?: string;
}

const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
                                                             children,
                                                             glow = false,
                                                             padding = 4,
                                                             maxWidth,
                                                             marginTop,
                                                             marginBottom,
                                                             marginLeft,
                                                             marginRight,
                                                             maxHeight,
                                                             overflowY,

                                                         }) => {
    return (
        <GlassPaper
            elevation={0}
            glow={glow}
            customPadding={padding}
            customMaxWidth={maxWidth}
            sx={{
                marginTop: marginTop,
                marginBottom: marginBottom,
                marginLeft: marginLeft,
                marginRight: marginRight,
                overflowY: overflowY,
                maxHeight: maxHeight,
            }}

        >
            {children}
        </GlassPaper>
    );
};

export default LiquidGlassCard;