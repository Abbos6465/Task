import { AppIconPropsType } from "@/components/ui/app-icon/app-icon.types";
import { computed, defineAsyncComponent } from "vue";

export default (props: AppIconPropsType) => {
    const SVGComponent = computed(() => props.icon && defineAsyncComponent(
        () => import(`@/assets/images/icons/${props.icon}.svg`)
    ));

    return {
        SVGComponent
    };
}