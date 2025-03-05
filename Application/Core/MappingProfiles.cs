using Application.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles:Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>().ForMember(dst => dst.Id, opts => opts.Ignore());
        CreateMap<CreateActivityDto, Activity>();
        CreateMap<EditActivityDto, Activity>();
    }
}