import Header from "./Header";
import { Meta, StoryFn } from "@storybook/react";

export default {
    title: 'component/Header',
    component: Header,
} as Meta;

const Template: StoryFn = () => <Header />;
export const Default = Template.bind({});