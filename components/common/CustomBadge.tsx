import { Badge, type IBadgeProps } from "native-base";

interface Props extends IBadgeProps {}

export default function CustomBadge(props: Props) {
  const {
    children,
    style = {},
    _text = {},
    variant,
    borderColor,
    ...others
  } = props;

  const DEFAULT_STYLE = {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 6,
  };

  return (
    <Badge
      _text={{
        color: "#FF6B6B",
        fontWeight: "600",
        ..._text,
      }}
      variant={variant}
      borderColor={borderColor}
      style={[style, DEFAULT_STYLE]}
      {...others}
    >
      {children}
    </Badge>
  );
}
