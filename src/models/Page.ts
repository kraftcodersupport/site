import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISection {
    heading: string;
    body: string;
    icon?: string;
}

export interface IFAQ {
    question: string;
    answer: string;
}

export interface IStat {
    label: string;
    value: string;
}

export interface IAIContent {
    hero_headline: string;
    hero_subheadline: string;
    sections: ISection[];
    faq: IFAQ[];
    stats: IStat[];
}

export interface IMetaTags {
    title: string;
    description: string;
    keywords: string[];
}

export interface IPage extends Document {
    niche_slug: string;
    title: string;
    description: string;
    ai_generated_content: IAIContent;
    meta_tags: IMetaTags;
    image_url: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const SectionSchema = new Schema<ISection>(
    {
        heading: { type: String, required: true },
        body: { type: String, required: true },
        icon: { type: String },
    },
    { _id: false }
);

const FAQSchema = new Schema<IFAQ>(
    {
        question: { type: String, required: true },
        answer: { type: String, required: true },
    },
    { _id: false }
);

const StatSchema = new Schema<IStat>(
    {
        label: { type: String, required: true },
        value: { type: String, required: true },
    },
    { _id: false }
);

const AIContentSchema = new Schema<IAIContent>(
    {
        hero_headline: { type: String, required: true },
        hero_subheadline: { type: String, required: true },
        sections: { type: [SectionSchema], default: [] },
        faq: { type: [FAQSchema], default: [] },
        stats: { type: [StatSchema], default: [] },
    },
    { _id: false }
);

const MetaTagsSchema = new Schema<IMetaTags>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        keywords: { type: [String], default: [] },
    },
    { _id: false }
);

const PageSchema = new Schema<IPage>(
    {
        niche_slug: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
        },
        title: { type: String, required: true },
        description: { type: String, required: true },
        ai_generated_content: { type: AIContentSchema, required: true },
        meta_tags: { type: MetaTagsSchema, required: true },
        image_url: { type: String, default: "" },
        published: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

const PageModel: Model<IPage> =
    mongoose.models.Page || mongoose.model<IPage>("Page", PageSchema);

export default PageModel;
